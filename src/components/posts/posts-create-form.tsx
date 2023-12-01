"use client";
import { createPost } from "@/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  Input,
  Button,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "../common/form-button";
export default function PostCreateForm({
  slug,
  topicId,
}: {
  slug: string;
  topicId: string;
}) {
  const bindedFormAction = createPost.bind(null, slug, topicId);
  const [formState, action] = useFormState(bindedFormAction, { errors: {} });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="bg-red-400 p-2 border rounded-xl border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}
            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
