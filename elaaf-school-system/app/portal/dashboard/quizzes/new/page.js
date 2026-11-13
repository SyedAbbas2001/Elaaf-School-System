import NewQuizForm from "@/components/portal/NewQuizForm";
import { CLASSES, SUBJECTS } from "@/lib/constants";
import { param } from "@/lib/diaryQuery";
import { isYmd } from "@/lib/dates";

export const dynamic = "force-dynamic";

export default async function NewQuizPage({ searchParams }) {
  const sp = await searchParams;
  const className = param(sp, "className");
  const subject = param(sp, "subject");
  const date = param(sp, "date");
  // Opened from the quiz schedule: the class and subject are filled in, the teacher writes the title
  const scheduled = CLASSES.includes(className) && SUBJECTS.includes(subject) && isYmd(date);

  return (
    <>
      <div className="pt-head">
        <h1>Create quiz</h1>
        <p>Choose the class and subject, then add questions on the next screen.</p>
      </div>
      <NewQuizForm
        initial={{
          title: "",
          className: scheduled ? className : CLASSES[0],
          subject: scheduled ? subject : SUBJECTS[0],
          timeLimitMin: scheduled ? "15" : "",
          scheduledFor: scheduled ? date : "",
        }}
      />
    </>
  );
}
