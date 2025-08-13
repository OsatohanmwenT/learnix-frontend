import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

interface AnswerOptionsSectionProps {
  form: UseFormReturn<any>;
  fields: any[];
  append: UseFieldArrayReturn<any>["append"];
  remove: UseFieldArrayReturn<any>["remove"];
  questionType: string;
}
export function AnswerOptionsSection({
  form,
  fields,
  append,
  remove,
  questionType,
}: AnswerOptionsSectionProps) {
  const addOption = () => {
    append({ text: "", isCorrect: false });
  };

  const setCorrectAnswer = (index: number) => {
    fields.forEach((_, i) => {
      form.setValue(`answerOptions.${i}.isCorrect`, i === index);
    });
  };

  if (questionType === "multiple_choice") {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            Answer Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-start gap-3 p-3 border rounded-xs hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  checked={!!form.watch(`answerOptions.${index}.isCorrect`)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setCorrectAnswer(index);
                    }
                  }}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name={`answerOptions.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={`Option ${String.fromCharCode(
                            65 + index
                          )}`}
                          {...field}
                          value={field.value ?? ""} // ✅ prevents uncontrolled warning
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {fields.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {fields.length < 6 && (
            <Button
              type="button"
              onClick={addOption}
              className="w-full py-2 h-auto bg-light-green"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (questionType === "true_false") {
    return (
      <FormField
        control={form.control}
        name="correctAnswer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Correct Answer</FormLabel>
            <Select onValueChange={(value) => {
              field.onChange(value);
              form.setValue("answerOptions", [
                { text: "true", isCorrect: value === "true" },
                { text: "false", isCorrect: value === "false" },
              ]);
            }} value={field.value ?? ""}>
              <FormControl>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  return null;
}
