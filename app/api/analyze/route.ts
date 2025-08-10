import { NextResponse } from "next/server";

function clampInt(v: number) {
  return Math.max(0, Math.min(100, Math.round(v)));
}

function getRandomScore(min: number = 30, max: number = 50) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function POST(req: Request) {
  try {
    let repoUrl = "";
    let figmaUrl = "";
    let pptUrl = "";

    const contentType = req.headers.get("content-type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      repoUrl = (formData.get("repo") as string) || "";
      figmaUrl = (formData.get("figma") as string) || "";
      pptUrl = (formData.get("ppt") as string) || "";
    } else {
      try {
        const body = await req.json();
        repoUrl = body.repo || "";
        figmaUrl = body.figma || "";
        pptUrl = body.ppt || "";
      } catch {
        return NextResponse.json(
          { error: "Unsupported content type" },
          { status: 400 }
        );
      }
    }

    if (!repoUrl && !figmaUrl && !pptUrl) {
      return NextResponse.json({
        Code: getRandomScore(),
        Design: getRandomScore(),
        Presentation: getRandomScore(),
      });
    }

    let codeScore = getRandomScore();
    if (repoUrl) {
      try {
        const repoPath = repoUrl.replace("https://github.com/", "").replace(/^\/+/, "");
        const headers: Record<string, string> = { 
          Accept: "application/vnd.github.v3+json" 
        };
        
        if (process.env.GITHUB_TOKEN) {
          headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
        }

        const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
          headers,
        });

        if (response.ok) {
          const data = await response.json();
          const stars = Number(data.stargazers_count ?? 0);
          const forks = Number(data.forks_count ?? 0);
          const openIssues = Number(data.open_issues_count ?? 0);
          const repoSize = Number(data.size ?? 0);

          const popularityScore = Math.log10(stars + 1) * 28 + Math.log10(forks + 1) * 12;
          const sizeScore = Math.min(20, Math.log10(repoSize + 1) * 5);
          codeScore = clampInt(popularityScore + sizeScore - openIssues * 0.08);
        }
      } catch (error) {
        console.error("GitHub analysis failed:", error);
      }
    }

    let designScore = getRandomScore();
    if (figmaUrl) {
      try {
        const fileKey = figmaUrl.match(/file\/([^\/?#]+)/)?.[1] || "";
        if (fileKey) {
          const headers: Record<string, string> = {};
          if (process.env.FIGMA_TOKEN) {
            headers["X-Figma-Token"] = process.env.FIGMA_TOKEN;
          }

          const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
            headers,
          });

          if (response.ok) {
            const data = await response.json();
            const components = data?.components ? Object.keys(data.components).length : 0;
            const styles = data?.styles ? Object.values(data.styles) : [];
            const colorStyles = styles.filter((s: any) => s.style_type === "FILL").length;
            const textStyles = styles.filter((s: any) => s.style_type === "TEXT").length;
            designScore = clampInt(components * 3 + colorStyles * 2 + textStyles * 2);
          }
        }
      } catch (error) {
        console.error("Figma analysis failed:", error);
      }
    }

    const presentationScore = pptUrl ? getRandomScore(40, 60) : getRandomScore();

    return NextResponse.json({
      Code: codeScore,
      Design: designScore,
      Presentation: presentationScore,
    });

  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({
      Design: getRandomScore(),
      Presentation: getRandomScore(),
    }, { status: 500 });
  }
}