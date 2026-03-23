import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 animate-fade-in">
      <div className="text-center">
        <p className="text-8xl lg:text-9xl font-jaguar text-sky-light leading-none">
          404
        </p>
        <h1 className="text-xl lg:text-2xl mt-4 mb-2">Page Not Found</h1>
        <p className="text-sm text-sky-mid font-body max-w-sm">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back to exploring.
        </p>
      </div>
      <Button to="/" variant="primary" size="lg">
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
