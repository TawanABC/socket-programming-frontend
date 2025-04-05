import TopNav from '@/app/ui/global/nav-bar';

export const experimental_ppr = true

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-none w-full">
                <TopNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-white">
                {children}
            </div>
        </div>
    );
}
