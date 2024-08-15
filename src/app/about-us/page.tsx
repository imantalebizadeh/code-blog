export default function AboutUsPage() {
  return (
    <div className="prose mt-8 max-w-none prose-a:text-primary">
      <p className="text-balance leading-7 [&:not(:first-child)]:mt-6">
        &quot;کد بلاگ&quot; یک وبلاگ ساده است که شما می توانید مقالات مرتبط با
        برنامه نویسی را بخوانید و یا دانسته های خودتان از دنیای برنامه نویسی را
        در این مکان با بقیه به اشتراک بگذارید. این پروژه یک پروژه تستی است و
        صرفا برای استفاده از آن در رزومه{" "}
        <a
          href="https://github.com/imantalebizadeh"
          target="_blank"
          className="underline"
        >
          خودم
        </a>
        , تحت عنوان یک نمونه کار ساخته شده است.
      </p>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        این پروژه با استفاده از تکنولوژی ها و ابزار های زیر توسعه داده شده است:
      </p>

      <ul>
        <li>React v18</li>
        <li>Next.js v14</li>
        <li>Typescript</li>
        <li>Tailwind CSS v3</li>
        <li>Shadcn/ui</li>
        <li>Prisma</li>
        <li>MySql</li>
      </ul>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        سایر ابزار ها و ویژگی هایی از React که در این پروژه استفاده شده است:
      </p>

      <ul>
        <li>React Query</li>
        <li>React-Hook-Form</li>
        <li>Zod</li>
        <li>Next-Auth v5</li>
        <li>Next-Safe-Actions</li>
        <li>React Server Components</li>
        <li>React Server Actions</li>
        <li>Loading UI and Streaming</li>
      </ul>
    </div>
  );
}
