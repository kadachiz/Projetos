import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBookmark, faEllipsisH, faEnvelope, faFeatherAlt, faHashtag, faHome, faSearch, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

const NavItem = ({icon, text}) => (
    <div className='flex items-center p-3 rounded-full cursor-pointer hover:bg-gray-600 transition duration-200'>
        <FontAwesomeIcon icon={icon} className='text-2xl mr-4'/>
        <span className="text-xl hidden xl:inline">{text}</span>
    </div>
)

export function Sidebar() {
    
    return (
        <div className="w-20 xl:w-64 sticky top-0 px-2 h-screen">
            <FontAwesomeIcon icon={faXTwitter} className='text-3xl m-4'/>
            <nav>
                <NavItem icon={faHome} text="Páina Inicial" />
                <NavItem icon={faSearch} text="Explorar" />
                <NavItem icon={faBell} text="Notificações" />
                <NavItem icon={faEnvelope} text="Mensagens" />
                <NavItem icon={faBookmark} text="Itens Salvos" />
                <NavItem icon={faUserFriends} text="Comunidades" />
                <NavItem icon={faXTwitter} text="Premium" />
                <NavItem icon={faUser} text="Perfil" />
                <NavItem icon={faEllipsisH} text="Mais" />
            </nav>
            <button className='bg-white text-twitter-background rounded-full font-bold px-4 py-3 mt-4 w-full cursor-pointer'>
                <FontAwesomeIcon icon={faFeatherAlt} className='text-twitter-background inline xl:hidden' />
                <span className='hidden xl:inline'>Postar</span>
            </button>


        </div>
    )
}