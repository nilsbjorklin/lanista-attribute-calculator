import './content.css'

export default function Content({ children }) {
    console.log('Render Content');
    return (
        <div className='content'>
            {children}
        </div>
    );
}