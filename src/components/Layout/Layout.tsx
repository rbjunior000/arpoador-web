import {
  AppSidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  UserDropdown,
} from "@/components";
export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <span className="text-lg font-semibold">Dashboard</span>
          <div className="ml-auto">
            <UserDropdown />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{props.children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
