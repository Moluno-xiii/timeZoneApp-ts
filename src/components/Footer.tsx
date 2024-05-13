const Footer: React.FC = () => {
const date = new Date();
const year = date.getFullYear()
const dotSign = "\u00B7";
    return (

        <div >
            &copy; {year} Timezone inc {dotSign}
        </div>
    )
}

export default Footer
