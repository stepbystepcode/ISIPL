
import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from '@/lib/supabaseClient';
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface PasswordCheckResult {
    isStrong: boolean;
    message: string;
}

function isPasswordStrong(password: string): PasswordCheckResult {
    if (password.length < 8) {
        return {
            isStrong: false,
            message: '密码长度必须至少为8个字符。',
        };
    }
    if (!/[A-Z]/.test(password)) {
        return {
            isStrong: false,
            message: '密码必须包含至少一个大写字母。',
        };
    }
    if (!/[a-z]/.test(password)) {
        return {
            isStrong: false,
            message: '密码必须包含至少一个小写字母。',
        };
    }
    if (!/[0-9]/.test(password)) {
        return {
            isStrong: false,
            message: '密码必须包含至少一个数字。',
        };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            isStrong: false,
            message: '密码必须包含至少一个特殊字符。',
        };
    }

    return {
        isStrong: true,
        message: '密码强度足够。',
    };
}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [confirm, setConfirm] = React.useState<string>("")
    const [tip, setTip] = React.useState<string>("")
    const isLogin = window.location.pathname === '/login'

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        if (!email || !password) {
            setTip("请填写所有字段")
            return
        }
        if (!isLogin && password !== confirm) {
            setTip("密码不匹配")
            return
        }
        setIsLoading(true)
        if (isLogin) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            setTimeout(() => {
                setIsLoading(false)
                console.log(data, error)
                if (error){
                    alert("用户名或密码错误");
                }
            }, 3000)
        }else{
            const passwordCheckResult = isPasswordStrong(password);
            if (!passwordCheckResult.isStrong) {
                setTip(passwordCheckResult.message);
                setIsLoading(false);
                return;
            }
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: '/dashboard',
                },
            })
            setTimeout(() => {
                setIsLoading(false)
                console.log(data, error)
                if (error){
                    alert("注册失败");
                }
            }, 3000)
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            电子邮件
                        </Label>
                        <Input
                            id="email"
                            placeholder="电子邮件"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <Label className="sr-only" htmlFor="password">
                            密码
                        </Label>
                        <Input
                            id="password"
                            placeholder="密码"
                            type="password"
                            disabled={isLoading}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {!isLogin &&
                        <>
                            <Label className="sr-only" htmlFor="confirm">
                                确认密码
                            </Label>
                            <Input
                                id="confirm"
                                placeholder="确认密码"
                                type="password"
                                disabled={isLoading}
                                onChange={(event) => setConfirm(event.target.value)}
                            />
                        </>
                        }
                    </div>
                    <div className="text-sm text-red-500">{tip}</div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isLogin ? "登录" : "注册"}
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            或者选择
          </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                GitHub
            </Button>
        </div>
    )
}