import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Check, X } from "lucide-react";
import { toast } from "sonner"


// 模拟用户数据
const initialUserData = {
  avatar: "",
  name: "张明",
  email: "zhangming@example.com",
  phone: "13812345678",
  department: "计算机科学与技术学院",
  title: "教授",
  bio: "主要研究方向为人工智能、机器学习和自然语言处理。在国内外重要期刊和会议上发表论文50余篇。",
  notifications: {
    email: true,
    sms: false,
    browser: true,
  }
};

export const Settings = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // 处理个人信息变更
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 处理部门选择变更
  const handleDepartmentChange = (value: string) => {
    setUserData(prev => ({
      ...prev,
      department: value,
    }));
  };

  // 处理职称选择变更
  const handleTitleChange = (value: string) => {
    setUserData(prev => ({
      ...prev,
      title: value,
    }));
  };

  // 处理通知设置变更
  const handleNotificationChange = (key: keyof typeof userData.notifications) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  // 处理密码变更
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value,
    }));

    // 清除对应的错误信息
    setPasswordErrors(prev => ({
      ...prev,
      [name]: "",
    }));
  };

  // 验证密码
  const validatePasswords = () => {
    let isValid = true;
    const errors = {
      current: "",
      new: "",
      confirm: "",
    };

    if (!passwords.current) {
      errors.current = "请输入当前密码";
      isValid = false;
    }

    if (!passwords.new) {
      errors.new = "请输入新密码";
      isValid = false;
    } else if (passwords.new.length < 8) {
      errors.new = "新密码长度至少为8位";
      isValid = false;
    }

    if (!passwords.confirm) {
      errors.confirm = "请确认新密码";
      isValid = false;
    } else if (passwords.confirm !== passwords.new) {
      errors.confirm = "两次输入的密码不一致";
      isValid = false;
    }

    setPasswordErrors(errors);
    return isValid;
  };

  // 提交个人信息更新
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    // 模拟API请求
    setTimeout(() => {
      setIsUpdatingProfile(false);
      toast.success("个人信息更新成功");
    }, 1000);
  };

  // 提交密码更改
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }

    setIsChangingPassword(true);

    // 模拟API请求
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswords({
        current: "",
        new: "",
        confirm: "",
      });
      toast.success("密码修改成功");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">系统设置</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">个人信息</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
        </TabsList>

        {/* 个人信息设置 */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>
                  更新您的个人信息和个人简介
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileSubmit}>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={userData.avatar || undefined} alt={userData.name} />
                      <AvatarFallback>{userData.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        更换头像
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">姓名</Label>
                      <Input
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">邮箱</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">手机号码</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">所属部门</Label>
                      <Select
                        value={userData.department}
                        onValueChange={handleDepartmentChange}
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="选择部门" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="计算机科学与技术学院">计算机科学与技术学院</SelectItem>
                          <SelectItem value="数学科学学院">数学科学学院</SelectItem>
                          <SelectItem value="物理与光电工程学院">物理与光电工程学院</SelectItem>
                          <SelectItem value="化学化工学院">化学化工学院</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">职称</Label>
                    <Select
                      value={userData.title}
                      onValueChange={handleTitleChange}
                    >
                      <SelectTrigger id="title">
                        <SelectValue placeholder="选择职称" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="教授">教授</SelectItem>
                        <SelectItem value="副教授">副教授</SelectItem>
                        <SelectItem value="讲师">讲师</SelectItem>
                        <SelectItem value="助教">助教</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">个人简介</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={userData.bio}
                      onChange={handleProfileChange}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isUpdatingProfile}>
                    {isUpdatingProfile ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        保存中...
                      </>
                    ) : (
                      "保存更改"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </TabsContent>

        {/* 安全设置 */}
        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>修改密码</CardTitle>
                <CardDescription>
                  更新您的账户密码
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">当前密码</Label>
                    <Input
                      id="current"
                      name="current"
                      type="password"
                      value={passwords.current}
                      onChange={handlePasswordChange}
                    />
                    {passwordErrors.current && (
                      <p className="text-sm text-red-500">{passwordErrors.current}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new">新密码</Label>
                    <Input
                      id="new"
                      name="new"
                      type="password"
                      value={passwords.new}
                      onChange={handlePasswordChange}
                    />
                    {passwordErrors.new && (
                      <p className="text-sm text-red-500">{passwordErrors.new}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm">确认新密码</Label>
                    <Input
                      id="confirm"
                      name="confirm"
                      type="password"
                      value={passwords.confirm}
                      onChange={handlePasswordChange}
                    />
                    {passwordErrors.confirm && (
                      <p className="text-sm text-red-500">{passwordErrors.confirm}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isChangingPassword}>
                    {isChangingPassword ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        更新中...
                      </>
                    ) : (
                      "更新密码"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>登录记录</CardTitle>
                <CardDescription>
                  您的账户最近的登录活动
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: "Windows PC", location: "山西太原", time: "今天 10:30", current: true },
                    { device: "iPhone 13", location: "山西太原", time: "昨天 18:45" },
                    { device: "MacBook Pro", location: "北京", time: "2025-02-28 09:15" },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.location} · {session.time}
                        </p>
                      </div>
                      {session.current && (
                        <div className="flex items-center text-sm text-green-500">
                          <Check className="h-4 w-4 mr-1" />
                          当前设备
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 通知设置 */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>
                配置您希望接收的通知方式
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">电子邮件通知</h3>
                  <p className="text-sm text-muted-foreground">
                    接收重要更新和通知到您的邮箱
                  </p>
                </div>
                <Switch
                  checked={userData.notifications.email}
                  onCheckedChange={() => handleNotificationChange("email")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">短信通知</h3>
                  <p className="text-sm text-muted-foreground">
                    接收重要更新和通知到您的手机
                  </p>
                </div>
                <Switch
                  checked={userData.notifications.sms}
                  onCheckedChange={() => handleNotificationChange("sms")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">浏览器通知</h3>
                  <p className="text-sm text-muted-foreground">
                    在您使用系统时显示桌面通知
                  </p>
                </div>
                <Switch
                  checked={userData.notifications.browser}
                  onCheckedChange={() => handleNotificationChange("browser")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success("通知设置已保存")}>
                保存设置
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};