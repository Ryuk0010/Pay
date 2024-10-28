import { getServerSession } from "next-auth";
import { TypewriterEffectDemo } from "../../components/typeWriterHomePage";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";


export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      redirect('/dashboard')
    }
    return <div className="w-screen h-screen overflow-hidden">
        <TypewriterEffectDemo/>
    </div>
}