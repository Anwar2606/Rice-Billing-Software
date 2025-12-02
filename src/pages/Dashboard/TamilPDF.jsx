import React from "react";
import {
Page,
Text,
Image,
View,
Document,
StyleSheet,
Font,
} from "@react-pdf/renderer";

import logo from "../assets/annakshi-logo.jpg";
import watermark from "../assets/annakshi-logo.jpg";

// ---------------- FONT REGISTER ----------------
Font.register({
family: "TamilFont",
src: "/fonts/NotoSansTamil-Regular.ttf",
});
Font.register({
family: "TamilFontBold",
src: "/fonts/NotoSansTamil-Bold.ttf",
fontWeight: "bold",
});
Font.register({
family: "EnglishFont",
src: "/fonts/Roboto-Regular.ttf",
});
Font.register({
family: "EnglishFontBold",
src: "/fonts/Roboto-Bold.ttf",
fontWeight: "bold",
});

// ---------------- NUMBER TO WORDS ----------------
function numberToWords(num) {
if (!Number.isFinite(num)) return "";
num = Math.floor(num);

const ones = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
const teens = ["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen",
                "Seventeen","Eighteen","Nineteen"];
const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

if (num === 0) return "Zero";

function convertHundreds(n) {
let out = "";
if (n > 99) {
    out += ones[Math.floor(n / 100)] + " Hundred ";
    n = n % 100;
}
if (n >= 20) {
    out += tens[Math.floor(n / 10)] + " ";
    n = n % 10;
}
if (n >= 10 && n <= 19) {
    out += teens[n - 10] + " ";
    return out;
}
if (n > 0) {
    out += ones[n] + " ";
}
return out;
}

let word = "";
let thousandCounter = 0;
const thousandNames = ["", "Thousand", "Million", "Billion"];

while (num > 0) {
let chunk = num % 1000;
if (chunk > 0) {
    word = convertHundreds(chunk) + thousandNames[thousandCounter] + " " + word;
}
num = Math.floor(num / 1000);
thousandCounter++;
}

return word.trim();
}

// ------------------- STYLES ----------------------
const styles = StyleSheet.create({
page: {
padding: 8,
fontSize: 10,
fontFamily: "TamilFont",
},

outerBox: {
border: "1pt solid #000",
minHeight: "98%",
padding: 8,
position: "relative",
},

watermark: {
position: "absolute",
width: 260,
height: 260,
opacity: 0.06,
left: "50%",
top: "44%",
transform: "translate(-130px, -130px)",
},

// ---------------- HEADER ----------------
header: {
flexDirection: "row",
alignItems: "flex-start",
borderBottom: "1pt solid #000",
paddingBottom: 6,
},

headerLeft: { width: "18%" },
headerCenter: { width: "56%", textAlign: "center" },
headerRight: { width: "26%", textAlign: "right" },

logo: { width: 66, height: 66 },

shopTitle: {
fontFamily: "TamilFontBold",
fontSize: 15,
color: "#008000",
marginTop: 2,
},

shopSub: { fontSize: 9, color: "red", marginTop: 3 },
address: { fontSize: 9, marginTop: 2 },

phoneNo: {
fontFamily: "EnglishFontBold",
fontSize: 10,
color: "orange",
},

billMeta: {
marginTop: 4,
fontFamily: "EnglishFontBold",
},

fssai: {
color: "red",
fontSize: 8,
marginTop: 3,
},

// ---------------- CUSTOMER BLOCK ----------------
customerBlock: {
marginTop: 10,
borderBottom: "1pt solid #000",
paddingBottom: 10,
},

customerRow: {
flexDirection: "row",
marginTop: 8,
},

leftLabel: {
width: "25%",
fontFamily: "TamilFontBold",
fontSize: 10,
},

leftLine: {
width: "70%",
borderBottom: "0.8pt solid #000",
height: 12,
},

// ---------------- TABLE ----------------
tableBox: {
marginTop: 10,
border: "1pt solid #000",
},

tableHeader: {
flexDirection: "row",
backgroundColor: "#e6eef9",
borderBottom: "1pt solid #000",
fontFamily: "TamilFontBold",
},

th: {
padding: 6,
fontFamily: "TamilFontBold",
borderRight: "1pt solid #000",
textAlign: "center",
},

tr: {
flexDirection: "row",
borderBottom: "1pt solid #000",
minHeight: 80,
},

td: {
padding: 6,
borderRight: "1pt solid #000",
fontSize: 10,
},

// ---------------- TOTALS ----------------
totalsRow: {
flexDirection: "row",
borderTop: "1pt solid #000",
},

totalsLabel: {
width: "75%",
padding: 6,
textAlign: "right",
fontFamily: "EnglishFontBold",
},

totalsValue: {
width: "25%",
padding: 6,
},

// ---------------- FOOTER ----------------
bottomArea: {
marginTop: 12,
flexDirection: "row",
},

paymentBox: {
width: "65%",
border: "1pt solid #000",
padding: 8,
},

forText: {
fontFamily: "EnglishFontBold",
fontSize: 11,
marginTop: 20,
},

signText: {
fontSize: 10,
marginTop: 10,
},

thankText: {
marginTop: 8,
fontFamily: "EnglishFontBold",
fontSize: 9,
color: "green",
textAlign: "center",
},
});

// ------------------- FINAL PDF ----------------------
const TamilPDF = ({
invoiceNumber = 1,
cart = [],
billingDetails = { grandTotal: 0 },
customerName = "",
customerAddress = "",
customerPhoneNo = "",
 billDate, 
fssaiNo = "22425147000929",
}) => {
const computedTotal = cart.reduce(
(sum, item) => sum + item.saleprice * item.quantity,
0
);

const total = billingDetails.grandTotal || computedTotal;

const grandWords = numberToWords(total);

return (
<Document>
    <Page size="A4" style={styles.page}>
    <View style={styles.outerBox}>
        <Image src={watermark} style={styles.watermark} />

        {/* HEADER */}
        <View style={styles.header}>
        <View style={styles.headerLeft}>
            <Image src={logo} style={styles.logo} />
            <Text style={styles.fssai}>FSSAI : {fssaiNo}</Text>
        </View>

        <View style={styles.headerCenter}>
            <Text style={styles.shopTitle}>அன்னக்ஷி பாரம்பரிய அரிசி கடை</Text>
            <Text style={styles.shopSub}>
            இயற்கையாகவே வளமானது ஊட்டச்சத்து நிறைந்தது
            </Text>
            <Text style={styles.address}>110, ஜவுளி கடை தெரு, சிவகாசி - 626123.</Text>
        </View>

        <View style={styles.headerRight}>
            <Text style={styles.phoneNo}>63742 51386</Text>
            <Text style={styles.phoneNo}>63806 58228</Text>

            <Text style={styles.billMeta}>
            BILL NUMBER: {String(invoiceNumber).padStart(3, "0")}
            </Text>
            <Text style={styles.billMeta}>
  Date: {billDate ? billDate.toLocaleDateString("en-GB") : "N/A"}
</Text>

        </View>
        </View>

        {/* CUSTOMER BLOCK */}
        <View style={styles.customerBlock}>

{/* CUSTOMER NAME */}
<View style={styles.customerRow}>
<Text style={styles.leftLabel}>வாடிக்கையாளார் பெயர்</Text>

<Text
    style={{
    width: "70%",
    borderBottom: "0.8pt solid #000",
    fontSize: 10,
    paddingLeft: 4,
    fontFamily: "TamilFontBold",
    }}
>
    {customerName ? customerName : "N/A"}
</Text>
</View>

{/* PHONE */}
<View style={styles.customerRow}>
<Text style={styles.leftLabel}>தொலைபேசி எண்</Text>

<Text
    style={{
    width: "70%",
    borderBottom: "0.8pt solid #000",
    fontSize: 10,
    paddingLeft: 4,
    fontFamily: "EnglishFontBold",
    }}
>
    {customerPhoneNo ? customerPhoneNo : "N/A"}
</Text>
</View>


</View>

        {/* PRODUCT TABLE */}
        <View style={styles.tableBox}>
        {/* TABLE HEADER */}
        <View style={styles.tableHeader}>
            <Text style={[styles.th, { width: "10%" }]}>வ.எண்</Text>
            <Text style={[styles.th, { width: "45%" }]}>அரிசி பெயர்</Text>
            <Text style={[styles.th, { width: "15%" }]}>அளவு</Text>
            <Text style={[styles.th, { width: "15%" }]}>விலை</Text>
           <Text
  style={[
    styles.th,
    {
      width: "17%",
      borderRight: "none",
      fontFamily: "TamilFontBold",
      fontSize: 11,
    },
  ]}
>
  மொத்தம்
</Text>


        </View>

        {/* ROWS */}
        {cart.length === 0 ? (
            <View style={styles.tr}>
            <Text style={[styles.td, { width: "10%" }]} />
            <Text style={[styles.td, { width: "45%" }]} />
            <Text style={[styles.td, { width: "15%" }]} />
            <Text style={[styles.td, { width: "15%" }]} />
            <Text style={[styles.td, { width: "17%", borderRight: "none" }]} />
            </View>
        ) : (
            cart.map((item, i) => (
                <View key={i} style={styles.tr}>
<Text style={[styles.td, { width: "10%" }]}>{i + 1}</Text>
<Text style={[styles.td, { width: "45%" }]}>{item.name}</Text>
<Text style={[styles.td, { width: "15%" }]}>{item.quantity}</Text>
<Text style={[styles.td, { width: "15%" }]}>Rs. {item.saleprice}</Text>
<Text style={[styles.td, { width: "17%", borderRight: "none" }]}>
    Rs. {(item.quantity * item.saleprice).toFixed(2)}
</Text>
</View>
            ))
        )}

        {/* TOTALS */}
    {/* <View style={styles.totalsRow}>
<Text style={styles.totalsLabel}>மொத்தம் :</Text>
<Text style={styles.totalsValue}>Rs. {computedTotal.toFixed(2)}</Text>
</View> */}

<View style={{ flexDirection: "row", borderTop: "1pt solid #000" }}>
<Text
style={{
    width: "83%",           // aligns perfectly with table structure
    padding: 6,
    textAlign: "right",
    fontFamily: "EnglishFontBold",
}}
>
Grand Total :
</Text>

<Text
style={{
    width: "17%",           // EXACT SAME AS மொத்தம் (Total) column
    padding: 6,
    borderLeft: "1pt solid #000",
}}
>
Rs. {total.toFixed(2)}
</Text>
</View>

        </View>

        {/* AMOUNT IN WORDS */}
        <Text
        style={{
            marginTop: 8,
            fontFamily: "EnglishFontBold",
            fontSize: 10,
        }}
        >
        Amount in Words: {grandWords}
        </Text>

        {/* BOTTOM AREA */}
    {/* TERMS & CONDITIONS BOX */}
<View
style={{
border: "1pt solid #000",
marginTop: 12,
padding: 10,
}}
>
{/* Heading */}
<Text
style={{
    fontFamily: "EnglishFontBold",
    fontSize: 11,
    color: "#00008b",
    marginBottom: 6,
}}
>
Terms & Conditions
</Text>

{/* Terms List */}
<Text style={{ marginTop: 2, fontSize: 10 }}>
1. Goods once sold will not be taken back or exchanged.
</Text>
<Text style={{ marginTop: 2, fontSize: 10 }}>
2. Annakshi is not responsible for improper storage after purchase.
</Text>
<Text style={{ marginTop: 2, fontSize: 10 }}>
3. All prices are inclusive of packing.
</Text>
<Text style={{ marginTop: 2, fontSize: 10 }}>
4. Delivery (if applicable) is subject to availability and delivery charges.
</Text>

{/* For Annakshi + Signature aligned right */}
<View
style={{
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 10,
}}
>
<Text
    style={{
    fontFamily: "EnglishFontBold",
    fontSize: 11,
    marginBottom: 4,
    }}
>
    For ANNAKSHI
</Text>

<Text
    style={{
    fontFamily: "EnglishFontBold",
    fontSize: 11,
    }}
>
    Authorised Signature
</Text>
</View>
</View>


        {/* THANK YOU */}
        <Text style={styles.thankText}>
        Thank you for supporting Annakshi - Traditional Native Rice
        </Text>
    </View>
    </Page>
</Document>
);
};

export default TamilPDF;
