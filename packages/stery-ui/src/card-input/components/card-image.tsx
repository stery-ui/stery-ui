import { useEffect, useState } from "react"
import { useCardInputContext } from "../contexts/card-input-context"
import Amex from "../card-logos/amex"
import Dankort from "../card-logos/dankort"
import Dinersclub from "../card-logos/dinersclub"
import Discover from "../card-logos/discover"
import Elo from "../card-logos/elo"
import Jcb from "../card-logos/jcb"
import Maestro from "../card-logos/maestro"
import Mastercard from "../card-logos/mastercard"
import Visa from "../card-logos/visa"
import Unionpay from "../card-logos/unionpay"

type CardImageProps = {
    className?: string
}
export default function CardImage(props: CardImageProps) {
    const context = useCardInputContext()



    const [cardType, setCardType] = useState<string | null | undefined>(null)
    
    useEffect(() => {
        setCardType(context.cardType)
    }, [context.cardType])
    useEffect(() => {
        console.log(cardType)
    }, [cardType])

    // visa
    // mastercard
    // discover
    // amex
    // jcb
    // dinersclub
    // maestro
    // laser
    // unionpay
    // elo
    switch(cardType) {

        case 'amex': return <div {...props}><Amex width={30} height={30}/></div>;
        case 'dankort': return <div {...props}><Dankort width={30} height={30}/></div>;
        case 'dinersclub': return <div {...props}><Dinersclub width={30} height={30}/></div>;
        case 'discover': return <div {...props}><Discover width={30} height={30}/></div>;
        case 'elo': return <div {...props}><Elo width={30} height={30}/></div>;
        case 'jcb': return <div {...props}><Jcb width={30} height={30}/></div>;
        case 'maestro': return <div {...props}><Maestro width={30} height={30}/></div>;
        case 'mastercard': return <div {...props}><Mastercard width={30} height={30}/></div>;
        case 'unionpay': return <div {...props}><Unionpay width={30} height={30}/></div>;
        case 'visa': return <div {...props}><Visa width={30} height={30}/></div>;
    }
    return null
}