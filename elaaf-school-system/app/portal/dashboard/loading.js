// Shown in the page area, straight away, while a dashboard page is loading
export default function Loading() {
  return (
    <div className="pt-skel" role="status" aria-label="Loading">
      <div className="pt-skel-line pt-sk-title" />
      <div className="pt-skel-line pt-sk-sub" />
      <div className="pt-skel-row">
        <div className="pt-skel-box" />
        <div className="pt-skel-box" />
        <div className="pt-skel-box" />
      </div>
      <div className="pt-skel-block" />
    </div>
  );
}
