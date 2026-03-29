import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function ChatListLoading() {

    const [skeletonCount, setSkeletonCount] = useState(0);

    useEffect(() => {
        const height = document.getElementById("container-chat-list")?.clientHeight

        const itemHeight = 76;
        if( height ){
            const count = Math.floor(height / itemHeight);
            setSkeletonCount(count);
        }
        
    }, []);


    return (
        <div className="p-2 flex flex-col gap-2">
        <div>
            <Skeleton className="w-full h-5" />
        </div>
        <div className="flex gap-2">
            <Skeleton className="w-30 h-5" />
            <Skeleton className="w-30 h-5" />
            <Skeleton className="w-30 h-5" />
        </div>
        {
        Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-3 w-[20%]" />
                    </div>
                    <Skeleton className="h-3 w-[60%] mt-2" />
                </div>
            </div>
        ))
        } 
        </div>
    )
}
