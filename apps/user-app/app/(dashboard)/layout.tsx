import { SidebarItem } from "../../components/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="lg:flex w-screen h-screen"> {/* Ensures no overflow */}
      <div className="lg:border-r-2 sm:border-b-2 border-slate-100 lg:w-1/6 lg:pt-44 lg:pl-6 lg:text-xl max-lg:flex max-sm:justify-center max-md:justify-center">
        {/* Fixed width sidebar */}
        <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
        <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
        <SidebarItem href={"/p2ptransfer"} icon={<P2pTransactionsIcon />} title="Mobile Transfer" />
        <SidebarItem href={"/payBills"} icon={<PayBillsIcon />} title="Pay Bills"/>
        <SidebarItem href={"/crypto"} icon={<CryptoIcon />} title="Crypto"/>

      </div>
      <div >{children}</div> {/* Expands to fill the remaining space */}
    </div>
  );
}

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function PayBillsIcon() {
  return <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  className="w-6 h-6"
  opacity="0.5"
>
  <path d="M6 11a1 1 0 1 0 1 1 1 1 0 0 0-1-1Zm12 0a1 1 0 1 0 1 1 1 1 0 0 0-1-1Zm2-6H4A3 3 0 0 0 1 8v8a3 3 0 0 0 3 3H20a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm1 11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1ZM12 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z"></path>
</svg>

  
}

function CryptoIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
</svg>
}
function P2pTransactionsIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

}