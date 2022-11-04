import { Twemoji } from 'react-emoji-render';

export const Eyecatch = ({ place, icon, color }) => {

    let css

    if (place === 'list') {
        css = {
            backgroundColor: color,
            display: 'flex',
            width: '100%',
            height: '10rem',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
        }
    }

    if (place === 'article') {
        css = {
            backgroundColor: color,
            marginTop: '1rem',
            display: 'flex',
            width: '100%',
            height: '20rem',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '50px',
            borderRadius: '10px'
        }
    }



    return (
        <div style={css}>
            <Twemoji text={icon} />
        </div>
    )
}
