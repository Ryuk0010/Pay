import { DTH } from "../../../components/cabletv";
import { Electricity } from "../../../components/ElectricBill";
import { GasBooking } from "../../../components/GasBooking";
import { Mobilerecharge } from "../../../components/MobileRechangeCard";


export default function BillsCard() {
  return (
    <div className="mt-10 flex">
        <div>
            <div className="pt-4 lg:w-[50vh] lg:h-[30vh] w-96 lg:ml-20">
                <Mobilerecharge/>
            </div>
            <div className="pt-4 lg:w-[50vh] lg:h-[30vh] w-96 lg:ml-20 mt-16">
                <Electricity/>
            </div>
        </div>
        <div>
            <div className="pt-4 lg:w-[50vh] lg:h-[30vh] w-96 lg:ml-20">
                <DTH/>
            </div>
            <div className="pt-4 lg:w-[50vh] lg:h-[30vh] w-96 lg:ml-20 mt-16">
                <GasBooking/>
            </div>
        </div>

    </div>
  )
}