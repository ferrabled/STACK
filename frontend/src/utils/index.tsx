import { CallGetOrganizationData } from "components/wallet/contractCall";

export var formatDate = function formatDate(date: Date) {            // function for reusability
    var d = date.getUTCDate().toString(),           // getUTCDate() returns 1 - 31
        m = (date.getUTCMonth() + 1).toString(),    // getUTCMonth() returns 0 - 11
        y = date.getUTCFullYear().toString(),       // getUTCFullYear() returns a 4-digit year
        formatted = '';
    if (d.length === 1) {                           // pad to two digits if needed
        d = '0' + d;
    }
    if (m.length === 1) {                           // pad to two digits if needed
        m = '0' + m;
    }
    formatted = d + '/' + m + '/' + y;              // concatenate for output
    return formatted;
}


export var formatDateyMd = function formatDate(date: Date) {            // function for reusability
    var d = date.getUTCDate().toString(),           // getUTCDate() returns 1 - 31
        m = (date.getUTCMonth() + 1).toString(),    // getUTCMonth() returns 0 - 11
        y = date.getUTCFullYear().toString(),       // getUTCFullYear() returns a 4-digit year
        formatted = '';
    if (d.length === 1) {                           // pad to two digits if needed
        d = '0' + d;
    }
    if (m.length === 1) {                           // pad to two digits if needed
        m = '0' + m;
    }
    formatted = y + '-' + m + '-' + d;              // concatenate for output
    return formatted;
}


export async function sendInviteEmail(url:String, orgId:number) {
    const emailUrl = await CallGetOrganizationData(orgId).then((r) => {
        const text = `👨‍🏭 Te han invitado a unirte al sistema de Inventario de la Organización: ${r.name}.%0D%0A👩‍💻 Para tener acceso a los activos de tu empresa, puedes inscribirte desde el siguiente enlace: 👨‍💻%0D%0A${url}
        `;
        const mailShareEndpoint = `mailto:?subject=Invitación para unirte a Inventario de ${r.name}&body=`;
        return mailShareEndpoint+text;
    })
    return emailUrl;
    
    

}

