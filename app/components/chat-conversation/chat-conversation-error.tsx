import { Frown, RefreshCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"


export default function ChatErrorGetMessages({ message, cb }: {message: string, cb: () => void }) {
    return (
        <Empty className="h-full bg-muted/30">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Frown />
                </EmptyMedia>
                <EmptyTitle>Oopss!</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                    { message }
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline" onClick={cb} className="cursor-pointer">
                    <RefreshCcwIcon />
                    Recarregar
                </Button>
            </EmptyContent>
        </Empty>
    )
}