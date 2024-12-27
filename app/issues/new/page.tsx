'use client';
import 'easymde/dist/easymde.min.css';
import {Button, Callout, Text, TextField} from "@radix-ui/themes";
import {useForm, Controller} from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchemas";
import {z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>

const SimpleMdeEditor = dynamic(
    () => import("react-simplemde-editor"),
    {ssr: false}
)

const NewIssuePage = () => {
    const {register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();
    const [error, setError] = useState('');
    console.log(errors);
    return (
        <div className={"max-w-xl"}>
            {error && <Callout.Root color={"red"} className={"mb-1"}>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className={"space-y-3"} onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post("/api/issues", data);
                    router.push("/issues");
                } catch (error) {
                    setError('An unexpected error occurred');
                }
            })}>
                <TextField.Root placeholder={"Enter a new issue"} {...register('title')} ></TextField.Root>
                <ErrorMessage>{ errors.title?.message }</ErrorMessage>
                <Controller control={control} name={"description"}
                            render={({field}) => <SimpleMdeEditor {...field} placeholder={"Description"}/>}/>
                <ErrorMessage>{ errors.description?.message }</ErrorMessage>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage