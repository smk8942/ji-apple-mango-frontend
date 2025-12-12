import ClientAuthGuard from "@/app/components/Auth/ClientAuthGuard";
import { VideoProvider } from "@/context/VideoContext";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClientAuthGuard>
            <VideoProvider>
                <div className="container mx-auto max-w-7xl p-6 lg:pt-28 pt-16">
                    {children}
                </div>
            </VideoProvider>
        </ClientAuthGuard>
    )
}