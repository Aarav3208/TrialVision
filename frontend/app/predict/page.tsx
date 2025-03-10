"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, MessageSquare } from "lucide-react"
import { PredictionResult } from "@/components/prediction-result"
import { ChatInterface } from "@/components/chat-interface"

export default function PredictPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [formData, setFormData] = useState({
    study_title: "",
    criteria: "",
    enrollment: "",
    Allocation: "",
    Intervention_Model: "",
    Masking: "",
    Primary_Purpose: "",
    intervention: "",
    condition: "",
  })

  const [predictionResult, setPredictionResult] = useState<null | {
    prediction: string
    explanation: {
      top_contributing_features: Array<{ feature: string; impact: number }>
      interpretation: string
    }
  }>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual API endpoint
      // const response = await fetch('/api/predict', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })
      // const data = await response.json()

      // Mock response for demonstration
      const mockResponse = {
        prediction: Math.random() > 0.5 ? "Completed" : "Not Completed",
        explanation: {
          top_contributing_features: [
            { feature: "enrollment", impact: 0.32 },
            { feature: "criteria", impact: -0.28 },
            { feature: "Intervention_Model", impact: 0.21 },
            { feature: "study_title", impact: 0.18 },
            { feature: "condition", impact: -0.15 },
          ],
          interpretation: `The model predicted ${Math.random() > 0.5 ? "Completed" : "Not Completed"}. The enrollment size had a positive impact on completion probability. The complexity of eligibility criteria had a negative impact. The intervention model showed a moderate positive contribution. The study title clarity contributed positively. The specific condition being studied had a slight negative impact.`,
        },
      }

      // Set the prediction result
      setPredictionResult(mockResponse)
      setActiveTab("results")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Clinical Trial Prediction Tool</h1>
        <p className="mt-2 text-muted-foreground">
          Enter your clinical trial details to predict completion status and get explanations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Trial Information</TabsTrigger>
          <TabsTrigger value="results" disabled={!predictionResult}>
            Results & Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Enter Clinical Trial Details</CardTitle>
              <CardDescription>
                Provide information about your clinical trial to predict its completion status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="study_title">Study Title</Label>
                    <Input
                      id="study_title"
                      placeholder="Enter the full title of the study"
                      value={formData.study_title}
                      onChange={(e) => handleInputChange("study_title", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="criteria">Eligibility Criteria</Label>
                    <Textarea
                      id="criteria"
                      placeholder="Enter the inclusion and exclusion criteria"
                      className="min-h-[100px]"
                      value={formData.criteria}
                      onChange={(e) => handleInputChange("criteria", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="enrollment">Enrollment Size</Label>
                      <Input
                        id="enrollment"
                        type="number"
                        placeholder="Number of participants"
                        value={formData.enrollment}
                        onChange={(e) => handleInputChange("enrollment", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="allocation">Allocation</Label>
                      <Select
                        value={formData.Allocation}
                        onValueChange={(value) => handleInputChange("Allocation", value)}
                      >
                        <SelectTrigger id="allocation">
                          <SelectValue placeholder="Select allocation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Randomized">Randomized</SelectItem>
                          <SelectItem value="Non-Randomized">Non-Randomized</SelectItem>
                          <SelectItem value="N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="intervention_model">Intervention Model</Label>
                      <Select
                        value={formData.Intervention_Model}
                        onValueChange={(value) => handleInputChange("Intervention_Model", value)}
                      >
                        <SelectTrigger id="intervention_model">
                          <SelectValue placeholder="Select model type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Parallel Assignment">Parallel Assignment</SelectItem>
                          <SelectItem value="Crossover Assignment">Crossover Assignment</SelectItem>
                          <SelectItem value="Factorial Assignment">Factorial Assignment</SelectItem>
                          <SelectItem value="Sequential Assignment">Sequential Assignment</SelectItem>
                          <SelectItem value="Single Group Assignment">Single Group Assignment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="masking">Masking</Label>
                      <Select value={formData.Masking} onValueChange={(value) => handleInputChange("Masking", value)}>
                        <SelectTrigger id="masking">
                          <SelectValue placeholder="Select masking type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None (Open Label)">None (Open Label)</SelectItem>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Double">Double</SelectItem>
                          <SelectItem value="Triple">Triple</SelectItem>
                          <SelectItem value="Quadruple">Quadruple</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="primary_purpose">Primary Purpose</Label>
                    <Select
                      value={formData.Primary_Purpose}
                      onValueChange={(value) => handleInputChange("Primary_Purpose", value)}
                    >
                      <SelectTrigger id="primary_purpose">
                        <SelectValue placeholder="Select primary purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Treatment">Treatment</SelectItem>
                        <SelectItem value="Prevention">Prevention</SelectItem>
                        <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                        <SelectItem value="Supportive Care">Supportive Care</SelectItem>
                        <SelectItem value="Screening">Screening</SelectItem>
                        <SelectItem value="Health Services Research">Health Services Research</SelectItem>
                        <SelectItem value="Basic Science">Basic Science</SelectItem>
                        <SelectItem value="Device Feasibility">Device Feasibility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="intervention">Intervention</Label>
                    <Textarea
                      id="intervention"
                      placeholder="Describe the intervention(s) being tested"
                      value={formData.intervention}
                      onChange={(e) => handleInputChange("intervention", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Textarea
                      id="condition"
                      placeholder="Describe the condition(s) being studied"
                      value={formData.condition}
                      onChange={(e) => handleInputChange("condition", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Processing..." : "Predict Completion Status"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          {predictionResult && (
            <div className="space-y-6">
              <PredictionResult result={predictionResult} />

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    AI Analysis
                  </CardTitle>
                  <CardDescription>Additional insights about your clinical trial from our AI assistant</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChatInterface trialData={formData} predictionResult={predictionResult} />
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("form")}>
                  Edit Trial Information
                </Button>
                <Button
                  onClick={() => {
                    setFormData({
                      study_title: "",
                      criteria: "",
                      enrollment: "",
                      Allocation: "",
                      Intervention_Model: "",
                      Masking: "",
                      Primary_Purpose: "",
                      intervention: "",
                      condition: "",
                    })
                    setPredictionResult(null)
                    setActiveTab("form")
                  }}
                >
                  Start New Prediction
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

