import FooterCSS from '../../modules/Footer.module.css';

export default function Footer() {

    return (
        <div className={FooterCSS.Boxing}>
            <h3 style= { { width: '100%', textAlign: 'center' } }>Copyright 2022. LUMOS All rights reserved.  </h3>
        </div>
    );
}