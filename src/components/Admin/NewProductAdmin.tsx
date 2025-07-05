import Sidebar from "./Sidebar"

const NewProductAdmin:React.FC=()=>{
    return (
        <div className="w-screen max-w-full grid grid-cols-1 lg:grid-cols-6 absolute">
            <Sidebar/>
            <div>new products</div>
        </div>
    )
}
export default NewProductAdmin;