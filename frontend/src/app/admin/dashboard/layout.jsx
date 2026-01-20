import Sidebar from '@/app/admin/(components)/Sidebar/Sidebar'
import "../adminCss.css"
import SidebarParent from '../(components)/Sidebar/SidebarParent'

export default function DashboardLayout({ children }) {
  return (
    // 1. Use Flexbox instead of Grid
    <div className="flex min-h-screen bg-[#364153]"> 
      
      {/* 2. Sidebar Wrapper: Prevent it from shrinking */}
      <div className="flex-shrink-0 fixed w-fit lg:w-auto inset-0 top-0 z-[99999] p-[6px]
lg:static lg:inset-auto lg:z-auto lg:p-0">
        <SidebarParent />
      </div>


      <main className="flex-1 min-w-0 p-4 relative m-5 adminBg overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}