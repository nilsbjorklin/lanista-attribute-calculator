import './header.css';

export default function Header({ children }) {
    console.log('Render Header');
    return ([
        <div key='header-wrapper' className='header-wrapper'>
            <div className='header'>
                <div className='buttonContainer'>
                    {children}
                </div>
            </div>
        </div>]
    );
}