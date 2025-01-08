import CapitalStructure from "@/components/chart/CapitalStructure";

const fakeData = {
    title: "Cấu trúc vốn EB-5 an toàn",
    capital_source: [
        {
            browser: "Vốn chủ đầu tư",
            visitors: 37.1,
            fill: "9E5431",
        },
        {
            browser: "Vốn vay EB-5",
            visitors: 70.4,
            fill: "E0C06C",
        },
        {
            browser: "Vốn từ khoản vay cao cấp",
            visitors: 44.8,
            fill: "BC9247",
        },
    ]
}

export default function page() {
    return (
        <main className="mt-[110vh] bg-background">
            <CapitalStructure dataCapitalStructure={fakeData} />
        </main>
    )
}