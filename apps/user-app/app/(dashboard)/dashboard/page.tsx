import { HelloCard } from "../../../components/HelloCard";
import { GetdashboardCard } from "../../../components/dashboardBalance";
import { DebitAndCrredit } from "../../../components/debitAndCredit";



export default async function () {
    const date = new Date();
    const hours = date.getHours();
    const greeting = (hours < 12)? ", Good Morning" : ", Good Evening";
    return <div>
        <div className="max-md:justify-center">
            <div className="flex max-md:justify-center font-extrabold text-3xl text-purple-800 pt-4 pl-4">
            <HelloCard/> {greeting}
            </div>
            <div className="lg:flex justify-around lg:ml-14">
                <div className="flex justify-center">
                    <GetdashboardCard/>
                </div>
                <div className="flex justify-center lg:ml-44">
                    <DebitAndCrredit/>
                </div>
            </div>
        </div>
    </div>
}