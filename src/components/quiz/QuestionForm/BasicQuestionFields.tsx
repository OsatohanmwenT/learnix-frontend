import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicQuestionFieldsProps {
  form: UseFormReturn<any>;
  questionType: string;
}

export function BasicQuestionFields({
  form,
  questionType,
}: BasicQuestionFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Question Type */}
      <FormField
        control={form.control}
        name="questionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full rounded-xs">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                <SelectItem value="true_false">True/False</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Question Text */}
      <FormField
        control={form.control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter your question here..."
                className="min-h-[80px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Points */}
      <FormField
        control={form.control}
        name="points"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Points</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                max="100"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>Points for correct answer (1-100)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Feedback */}
      <FormField
        control={form.control}
        name="feedback"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Feedback (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Provide explanation or context..."
                className="min-h-[60px] resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>Shown to students after answering</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
