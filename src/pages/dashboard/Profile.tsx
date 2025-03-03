import TodoCard from "@/components/Todo"
import StudyCard from "@/components/StudyCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
} from "@/components/ui/card"


export const ProfileCard = () => {
    return (
        <Card className="w-full max-w-md">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-1.5">
                        <h2 className="text-2xl font-bold">李京</h2>
                        <p className="text-sm text-muted-foreground">山西大学</p>
                        <p className="text-sm text-muted-foreground">计算机与信息技术学院</p>
                        <p className="text-sm text-muted-foreground">计算机科学与技术 2202</p>
                    </div>
                    <Avatar className="w-20 h-20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                </div>
                <div className="mt-6 pt-4 border-t">
                    <p className="text-sm font-medium">学号</p>
                    <p className="text-lg font-bold">202202501110</p>
                </div>
            </CardContent>
        </Card>
    )
}
export const Profile = () => {

    return (
        <div className="flex gap-4 p-8">
            <ProfileCard />
            <StudyCard />
            <TodoCard />
        </div>
    )
}