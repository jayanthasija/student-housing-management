import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProfileForm from "@/components/profile-form"
import EmergencyContactForm from "@/components/emergency-contact-form"
import PreferencesForm from "@/components/preferences-form"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Student Profile</h2>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Student Photo" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center space-y-1">
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-sm text-muted-foreground">ID: 12345678</p>
                <div className="text-sm text-muted-foreground">Computer Science, Junior</div>
              </div>
              <Button variant="outline" className="w-full">
                Change Photo
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Email</span>
                <span className="text-sm text-muted-foreground">john.doe@university.edu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Phone</span>
                <span className="text-sm text-muted-foreground">(555) 123-4567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Housing</span>
                <span className="text-sm text-muted-foreground">Smith Hall, 302</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="preferences">Housing Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="emergency" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>Add or update emergency contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <EmergencyContactForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Housing Preferences</CardTitle>
                <CardDescription>Set your room preferences and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <PreferencesForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

