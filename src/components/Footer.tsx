const Footer: React.FC = () => {
const date = new Date();
const year = date.getFullYear()
const dotSign = "\u00B7";
    return (
      <div className="text-center">
        &copy; {year} {dotSign} Timezone inc
      </div>
    );
}

export default Footer
