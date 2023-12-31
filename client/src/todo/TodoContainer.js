const TodoContainer = ({ title, icon, children, id, onContextMenu }) => {
    return (
        <div className='w-full bg-slate-200 rounded-sm flex flex-col items-center shadow-sm' key={id} onContextMenu={(event) => onContextMenu(event, id)}>
            <div className='flex justify-between w-full px-2 font-semibold my-2'>
                {title}
                {icon && icon}
            </div>
            {children}
        </div>
    );
};


export default TodoContainer;
