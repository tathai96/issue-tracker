'use client';
import 'easymde/dist/easymde.min.css';
import {Button, Callout, TextField} from "@radix-ui/themes";
import {useForm, Controller} from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {issuesSchema} from "@/app/validationSchemas";
import {z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import {Issue} from "@prisma/client";

type IssueFormData = z.infer<typeof issuesSchema>

const SimpleMdeEditor = dynamic(
    () => import("react-simplemde-editor"),
    {ssr: false}
)

interface Props {
    issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
    const {register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issuesSchema)
    });
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <div className={"max-w-xl"}>
            {error && <Callout.Root color={"red"} className={"mb-1"}>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className={"space-y-3"} onSubmit={handleSubmit(async (data) => {
                try {
                    setIsSubmitting(true);
                    if (issue) {
                        await  axios.patch("/api/issues/"+issue.id, data)
                    } else {
                        await axios.post("/api/issues", data);
                    }
                    router.push("/issues");
                    router.refresh();
                } catch (error) {
                    setIsSubmitting(false);
                    setError('An unexpected error occurred');
                }
            })}>
                <TextField.Root defaultValue={issue?.title} placeholder={"Enter a new issue"} {...register('title')} ></TextField.Root>
                <ErrorMessage>{ errors.title?.message }</ErrorMessage>
                <Controller control={control} name={"description"} defaultValue={issue?.description}
                            render={({field}) => <SimpleMdeEditor {...field} placeholder={"Description"}/>}/>
                <ErrorMessage>{ errors.description?.message }</ErrorMessage>
                <Button disabled={isSubmitting}>
                    { issue ? "Update Issue" : "Submit New Issue" }
                    {isSubmitting && <Spinner/>}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm