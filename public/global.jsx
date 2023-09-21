function HeaderMenu() {
        return (
                <div className="menu bg-black pad-20px d-flex-space-between">
                        <a href="/" className="bold t-d-none">
                                <span className="marca">
                                        <i class='fa-solid fa-circle'></i>
                                        &nbsp;
                                        Jeff Aporta
                                </span>
                        </a>

                        <span>
                                <ButtonGroup variant="text" aria-label="text button group">
                                        <Button href="/portafolio">
                                                Portafolio
                                        </Button>
                                        <Button href="/resumen">
                                                Resumen
                                        </Button>
                                </ButtonGroup>
                        </span>
                </div>
        )
}

function InformacionDeContacto() {
        return (
                <React.Fragment>
                        <b>YouTube:</b> &nbsp;
                        <a href="" className="t-d-none">
                                <i className="fa-brands fa-youtube c-red"></i> Jeff Aporta
                        </a>
                        <br />
                        <b>Whatsapp: </b>&nbsp;
                        <a href="https://api.whatsapp.com/send?phone=573107257814&text=Hola%20Jeff" className="t-d-none">
                                <i className="fa-brands fa-whatsapp c-lime"></i> +57 310 725 7814
                        </a>
                        <br />
                        <b>Telegram:</b> &nbsp;
                        <a href="https://t.me/jeffAporta" className="t-d-none">
                                <i className="fa-brands fa-telegram c-dodgerblue"></i> @jeffAporta
                        </a>
                        <br />
                        <b>Correo:</b> &nbsp;
                        <a href="mailto:jeffaporta@gmail.com" className="t-d-none">
                                <i className="fa-regular fa-envelope"></i> jeffaporta@gmail.com
                        </a>
                </React.Fragment>
        )
}

function BloqueInformacionDeContacto() {
        return (
                <div className="contenedor-con-padding bg-black ta-center">
                        <InformacionDeContacto />
                </div>
        )
}

function BloqueColeccionDeLogos() {
        return (
                <div className="contenedor-con-padding ta-center">
                        <ColeccionDeLogosDeTecnologias
                                items={[
                                        "https://i.ibb.co/WFY3yv8/descarga.png",
                                        "https://i.ibb.co/PrPx55Y/descarga2.png",
                                        "https://i.ibb.co/nPYJ8j3/logo-1.png",
                                        "https://i.ibb.co/SfgbXc0/descarga-1.png",
                                        "https://i.ibb.co/qnrgHLX/html5-logo-opencode-css-8.png",
                                        "https://i.ibb.co/F0zRQhG/1-bc9pm-Tiy-KR0-WNPka2w3e0-Q.png",
                                        "https://i.ibb.co/pQfH7bv/Java-programming-language-logo-svg.png",
                                        "https://i.ibb.co/ZTmL9zm/python-logo-C50-EED1930-seeklogo-com.png",
                                        "https://i.ibb.co/MnpT8Tq/Microsoft-Office-Excel-2019-present-svg.png",
                                        "https://i.ibb.co/W3wc0wS/descarga-2.png",
                                        "https://i.ibb.co/wgCqL5R/1-do-Ag1-f-MQKWFoub-6gw-Ui-Q.png",
                                        "https://i.ibb.co/2g2sY72/Git-Hub-Logo.png",
                                ]}
                        />
                </ div>
        )
}

function ColeccionDeLogosDeTecnologias({items}){
        return (
                <div>
                        {
                                items.map((e) => <img src={e} alt="logo" className="logo-tecnologia" />)
                        }
                </div>
        )
}