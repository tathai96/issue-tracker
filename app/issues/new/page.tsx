'use client';
import 'easymde/dist/easymde.min.css';
import {Button, TextField} from "@radix-ui/themes";
import {useForm, Controller} from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import {useRouter} from "next/navigation";

interface IssueForm {
    title: string;
    description: string;
}

const SimpleMdeEditor = dynamic(
    () => import("react-simplemde-editor"),
    {ssr: false}
)

const NewIssuePage = () => {
    const {register, control, handleSubmit} = useForm<IssueForm>();
    const router = useRouter()
    return (
        <form className={"max-w-xl space-y-3"} onSubmit={handleSubmit(async (data) => {
            await axios.post("/api/issues", data);
            router.push("/issues");
        })}>
            <TextField.Root placeholder={"Enter a new issue"} {...register('title')} >
            </TextField.Root>
            <Controller control={control} name={"description"}
                        render={({field}) => <SimpleMdeEditor { ...field } placeholder={"Description"}/>}/>
            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage