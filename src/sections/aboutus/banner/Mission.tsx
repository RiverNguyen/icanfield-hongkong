import ImageV2 from "@/components/image/ImageV2";

export default function Mission() {
    return <section className="relative">
        <ImageV2 
            className="w-full  object-cover"
            alt="" 
            width={1600} 
            height={1300} 
            src={'/imgs/about-us/bg-missionv2.png'} 
        />
    </section>
}