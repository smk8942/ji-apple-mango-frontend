import ClientAuthGuard from "@/app/components/Auth/ClientAuthGuard";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClientAuthGuard>
            <div className="container mx-auto max-w-7xl p-6 lg:pt-28 pt-16">
                {children}
            </div>
        </ClientAuthGuard>
    )
}