export default function Footer() {
  return (
    <footer className="container mt-10 py-8">
      <p className="text-center text-sm">
        ساخته شده توسط{" "}
        <a
          href="https://github.com/imantalebizadeh"
          className="font-medium underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          ایمان طابی زاده
        </a>
        {" . "}
        سورس کد پروژه در{" "}
        <a
          href="https://github.com/imantalebizadeh/code-blog"
          className="font-medium underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          گیت هاب
        </a>
      </p>
    </footer>
  );
}
