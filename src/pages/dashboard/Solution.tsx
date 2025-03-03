import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion, AnimatePresence } from "framer-motion";

// 定义解决方案步骤类型
interface SolutionStep {
  id: number;
  title: string;
  description: string;
  tips?: string;
}

// 模拟API响应类型
interface SolutionResponse {
  problemId: string;
  title: string;
  steps: SolutionStep[];
}

export const Solution = () => {
  const [problem, setProblem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<SolutionResponse | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  // 模拟API调用获取解决方案
  const fetchSolution = () => {
    setIsLoading(true);
    setSolution(null);
    setVisibleSteps([]);
    
    // 模拟API延迟
    setTimeout(() => {
      // 根据问题生成假数据
      const fakeSolution: SolutionResponse = {
        problemId: Math.random().toString(36).substring(2, 9),
        title: problem,
        steps: [
          {
            id: 1,
            title: "问题分析",
            description: "首先，我们需要理解问题的核心。这个问题涉及到" + problem.substring(0, 15) + "...",
            tips: "确保你完全理解了问题的各个方面和限制条件。"
          },
          {
            id: 2,
            title: "分解问题",
            description: "将问题分解为更小的、可管理的部分：\n1. 识别关键变量\n2. 确定约束条件\n3. 明确目标",
            tips: "问题分解是解决复杂问题的关键步骤。"
          },
          {
            id: 3,
            title: "寻找解决方案",
            description: "基于问题分析，我们可以采用以下策略解决：\n- 应用相关理论\n- 使用适当的工具和方法\n- 考虑多种可能的解决路径",
            tips: "不要局限于单一解决方案，尝试从多角度思考。"
          },
          {
            id: 4,
            title: "实施计划",
            description: "制定详细的实施计划，包括：\n- 所需资源\n- 时间安排\n- 潜在风险及应对措施",
            tips: "良好的计划是成功的一半。"
          },
          {
            id: 5,
            title: "验证与优化",
            description: "实施后，需要验证解决方案是否有效，并进行必要的优化调整。",
            tips: "持续改进是解决问题的最后一步，也是最重要的步骤之一。"
          }
        ]
      };
      
      setIsLoading(false);
      setSolution(fakeSolution);
      
      // 依次显示步骤的动画效果
      fakeSolution.steps.forEach((step, index) => {
        setTimeout(() => {
          setVisibleSteps(prev => [...prev, step.id]);
        }, 500 * (index + 1));
      });
    }, 1500); // 1.5秒后返回结果
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      fetchSolution();
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>输入您的问题</CardTitle>
          <CardDescription>
            详细描述您需要解决的问题，我们将为您提供分步解决方案
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="problem">问题描述</Label>
                <Textarea
                  id="problem"
                  placeholder="请输入您需要解决的问题..."
                  className="min-h-[100px]"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => setProblem("")}>
              清空
            </Button>
            <Button type="submit" disabled={isLoading || !problem.trim()}>
              {isLoading ? "分析中..." : "开始分析"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">正在分析问题，请稍候...</p>
        </div>
      )}

      {solution && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">"{solution.title}" 的解决方案</h2>
          
          <div className="space-y-4">
            <AnimatePresence>
              {solution.steps.map((step) => (
                visibleSteps.includes(step.id) && (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <div className="flex items-center justify-center rounded-full bg-primary text-primary-foreground h-8 w-8 mr-3">
                            {step.id}
                          </div>
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="whitespace-pre-line">{step.description}</p>
                          {step.tips && (
                            <div className="mt-4 p-3 bg-muted rounded-md">
                              <p className="text-sm font-medium">提示：{step.tips}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};