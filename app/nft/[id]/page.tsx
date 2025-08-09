import TopNav from "@/components/top-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NFTDetail({ params }: { params: { id: string } }) {
  const id = params.id
  return (
    <main>
      <TopNav showAuth={false} />
      <section className="mx-auto w-full max-w-4xl p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>NFT Detail — {id}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <img
                src="/red-nft-art-detail.png"
                alt="NFT artwork"
                className="h-72 w-full rounded-md object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Description:</span> Verified hackathon contribution NFT.
              </div>
              <div className="text-sm">
                <span className="font-medium">Creator:</span> 0x1234...abcd
              </div>
              <div className="text-sm">
                <span className="font-medium">Event:</span> Global Hack 2025
              </div>
              <div className="text-sm">
                <span className="font-medium">AI Score:</span> 88
              </div>
              <div className="text-sm">
                <span className="font-medium">Links:</span> github.com/user/repo • figma.com/file/xyz
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
