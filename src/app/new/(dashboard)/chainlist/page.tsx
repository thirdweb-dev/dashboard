import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChainListModeSelect } from "./components/mode-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ChainListPage: NextPage = () => {
  return (
    <section className="flex flex-col container mx-auto pt-10 gap-4">
      <header className="flex flex-col gap-3">
        <div className="flex flex-row justify-between align-middle">
          <h1 className="font-semibold text-3xl">Chainlist</h1>
          <div className="flex flex-row gap-4">
            <Button variant="ghost">Contact us</Button>
            <Button variant="outline">Add your chain</Button>
          </div>
        </div>
        <div className="flex flex-row justify-between align-middle">
          <Input className="max-w-[50%]" placeholder="Search"></Input>
          <ChainListModeSelect />
        </div>
      </header>
      <Separator />
      <main>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </section>
  );
};

export default ChainListPage;
