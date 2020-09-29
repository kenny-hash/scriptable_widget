// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: newspaper;
// The script shows the latest article
// from MacStories in a widget on your
// Home screen. Go to your Home screen
// to set up the script in a widget.
// The script will present a preview
// of the widget when running in the
// app.
var dark = Device.isUsingDarkAppearance()
let items = await loadItems()
var size = 2
size = parseInt(args.widgetParameter, 10)//size = 1, 2, 4
let widget = await createWidget(items, size)
// let img = await createbackgroundimg(nipponcolor)
// Check if the script is running in
// a widget. If not, show a preview of
// the widget to easier debug it.
if (!config.runsInWidget) {
  await widget.presentMedium()
  await widget.presentSmall()
  await widget.presentLarge()
}
// Tell the system to show the await widget.presentMedium().
Script.setWidget(widget)
Script.complete()

async function createbackgroundimg(nipponcolor, size) {
  const width = 400
  const height = 200
  var fontsize = 20
  var widgetsize = size
  if(widgetsize == 2){
    var size = new Size(width, height)
    fontsize = 20
  }else if(widgetsize == 4){
    var size = new Size(width, width)
    fontsize = 40
  }else if(widgetsize == 1){
    var size = new Size(height, height)
    fontsize = 40
  }else{
    var size = new Size(width, height)
    fontsize = 40
  }
  c = new DrawContext()
  c.size = size
  c.respectScreenScale = true
  c.setStrokeColor(Color.white())
  color_string = "#" + nipponcolor.color
  color_name = nipponcolor.name
  color_cname = nipponcolor.cname
  c.setFillColor(new Color(color_string))
  rect = new Rect(0, 100, size.width, size.height)
  c.fillRect(rect)
  c.setFont(Font.boldSystemFont(fontsize))
  c.setTextColor(Color.white())
  c.setTextAlignedCenter()
  c.drawTextInRect(color_cname +"   \n"+color_string+"   ", rect)
  img = c.getImage()
  return img
}

async function createWidget(items, size) {
  let authors = items.from
  let gradient = new LinearGradient()
  gradient.locations = [1,2]
  let color = await randomcolor(dark)
  let nipponcolor = await nipponcolors(dark)
  console.log(dark)
  console.log(nipponcolor)
  color = "#"+nipponcolor.color
//   let colortrans = await 
  gradient.colors = [
    new Color(color+"b3"),
    new Color(color+"e6")
  ]
  let w = new ListWidget()
  w.backgroundImage = await createbackgroundimg(nipponcolor, size)
  //w.backgroundColor = new Color("#b00a0f")
  w.backgroundGradient = gradient
  // Add spacer above content to center it vertically.
  w.addSpacer()
  
  // Show article headline.
  let titleTxt = w.addText("「"+items.hitokoto+"」")
  titleTxt.font = Font.boldSystemFont(24)
  console.log(size)
  if(size == 1){
    titleTxt.font = Font.boldSystemFont(18)
  }else if(size == 4) {
    titleTxt.font = Font.boldSystemFont(36)
  }
  titleTxt.textColor = Color.white()
  titleTxt.centerAlignText()
  // Add spacing below headline.
//   w.addSpacer(50)
  // Show authors.
//   let authorsTxt = w.addText("——" + authors+".         ")
//   authorsTxt.font = Font.mediumSystemFont(12)
//   authorsTxt.textColor = Color.white()
//   authorsTxt.textOpacity = 0.9
//   authorsTxt.rightAlignText()
  // Add spacing below authors.

//   w.addSpacer(2)
  // let Colortext = w.addText(nipponcolor.name + nipponcolor.cname)
  // Colortext.font = Font.boldSystemFont(36)
  // Colortext.textColor = Color.white()
  // Colortext.textOpacity = 0.3
  // Colortext.centerAlignText()
  w.addSpacer()
  return w
}
  
async function loadItems() {
  size = args.widgetParameter
  let url = "https://v1.hitokoto.cn/?encode=json?c=k"
  if(size = 1){
    url = url + "&max_length=15"
  }
  let req = new Request(url)
  let json = await req.loadJSON()
  return json
}

async function randomcolor(dark){
  let res = ["#","#"]
  while(res[0].length<6){
    var random = parseInt((128 + Math.random(1)*64), 10)
    var random2 = random + 32
    if(dark){
      random = 256 - random
      random2 = 256 - random2
    }
//     console.log("random"+random)
//     console.log(random2)
    res[0] += random.toString(16)
    res[1] += random2.toString(16)
  }
//   console.log(res)
  return res
}

async function nipponcolors(dark) {
  // body...
  colors = [
    {
        "id": "001",
        "name": "nadeshiko",
        "cname": "撫子",
        "color": "DC9F84"
    },
    {
        "id": "002",
        "name": "kohbai",
        "cname": "紅梅",
        "color": "E16B8C"
    },
    {
        "id": "003",
        "name": "suoh",
        "cname": "蘇芳",
        "color": "8E354A"
    },
    {
        "id": "004",
        "name": "taikoh",
        "cname": "退紅",
        "color": "F8C3CD"
    },
    {
        "id": "005",
        "name": "ikkonzome",
        "cname": "一斥染",
        "color": "F4A7B9"
    },
    {
        "id": "006",
        "name": "kuwazome",
        "cname": "桑染",
        "color": "64363c"
    },
    {
        "id": "007",
        "name": "momo",
        "cname": "桃",
        "color": "F596AA"
    },
    {
        "id": "008",
        "name": "ichigo",
        "cname": "莓",
        "color": "B5495B"
    },
    {
        "id": "009",
        "name": "usubeni",
        "cname": "薄紅",
        "color": "E87A90"
    },
    {
        "id": "010",
        "name": "imayoh",
        "cname": "今様",
        "color": "D05A6E"
    },
    {
        "id": "011",
        "name": "nakabeni",
        "cname": "中紅",
        "color": "DB4D6D"
    },
    {
        "id": "012",
        "name": "sakura",
        "cname": "桜",
        "color": "FEDFE1"
    },
    {
        "id": "013",
        "name": "umenezumi",
        "cname": "梅鼠",
        "color": "9E7A7A"
    },
    {
        "id": "014",
        "name": "karakurenai",
        "cname": "韓紅花",
        "color": "D0104C"
    },
    {
        "id": "015",
        "name": "enji",
        "cname": "燕脂",
        "color": "9F353A"
    },
    {
        "id": "016",
        "name": "kurenai",
        "cname": "紅",
        "color": "CB1B45"
    },
    {
        "id": "017",
        "name": "toki",
        "cname": "鴇",
        "color": "EEA9A9"
    },
    {
        "id": "018",
        "name": "cyohsyun",
        "cname": "長春",
        "color": "BF6766"
    },
    {
        "id": "019",
        "name": "kokiake",
        "cname": "深緋",
        "color": "86473F"
    },
    {
        "id": "020",
        "name": "sakuranezumi",
        "cname": "桜鼠",
        "color": "B19693"
    },
    {
        "id": "021",
        "name": "jinzamomi",
        "cname": "甚三紅",
        "color": "EB7A77"
    },
    {
        "id": "022",
        "name": "azuki",
        "cname": "小豆",
        "color": "954A45"
    },
    {
        "id": "023",
        "name": "suohkoh",
        "cname": "蘇芳香",
        "color": "A96360"
    },
    {
        "id": "024",
        "name": "akabeni",
        "cname": "赤紅",
        "color": "CB4042"
    },
    {
        "id": "025",
        "name": "shinsyu",
        "cname": "真朱",
        "color": "AB3B3A"
    },
    {
        "id": "026",
        "name": "haizakura",
        "cname": "灰桜",
        "color": "D7C4BB"
    },
    {
        "id": "027",
        "name": "kuriume",
        "cname": "栗梅",
        "color": "904840"
    },
    {
        "id": "028",
        "name": "ebicha",
        "cname": "海老茶",
        "color": "734338"
    },
    {
        "id": "029",
        "name": "ginsyu",
        "cname": "銀朱",
        "color": "C73E3A"
    },
    {
        "id": "030",
        "name": "kurotobi",
        "cname": "黒鳶",
        "color": "554236"
    },
    {
        "id": "031",
        "name": "benitobi",
        "cname": "紅鳶",
        "color": "994639"
    },
    {
        "id": "032",
        "name": "akebono",
        "cname": "曙",
        "color": "F19483"
    },
    {
        "id": "033",
        "name": "benikaba",
        "cname": "紅樺",
        "color": "B54434"
    },
    {
        "id": "034",
        "name": "mizugaki",
        "cname": "水がき",
        "color": "B9887D"
    },
    {
        "id": "035",
        "name": "sangosyu",
        "cname": "珊瑚朱",
        "color": "F17C67"
    },
    {
        "id": "036",
        "name": "benihiwada",
        "cname": "紅檜皮",
        "color": "884C3A"
    },
    {
        "id": "037",
        "name": "syojyohi",
        "cname": "猩猩緋",
        "color": "E83015"
    },
    {
        "id": "038",
        "name": "entan",
        "cname": "鉛丹",
        "color": "D75455"
    },
    {
        "id": "039",
        "name": "shikancha",
        "cname": "芝翫茶",
        "color": "B55D4C"
    },
    {
        "id": "040",
        "name": "hiwada",
        "cname": "檜皮",
        "color": "854836"
    },
    {
        "id": "041",
        "name": "kakishibu",
        "cname": "柿渋",
        "color": "A35E47"
    },
    {
        "id": "042",
        "name": "ake",
        "cname": "緋",
        "color": "CC543A"
    },
    {
        "id": "043",
        "name": "tobi",
        "cname": "鳶",
        "color": "724832"
    },
    {
        "id": "044",
        "name": "benihi",
        "cname": "紅緋",
        "color": "F75C2F"
    },
    {
        "id": "045",
        "name": "kurikawacha",
        "cname": "栗皮茶",
        "color": "6A4028"
    },
    {
        "id": "046",
        "name": "bengara",
        "cname": "弁柄",
        "color": "9A5034"
    },
    {
        "id": "047",
        "name": "terigaki",
        "cname": "照柿",
        "color": "C46243"
    },
    {
        "id": "048",
        "name": "edocha",
        "cname": "江戸茶",
        "color": "AF5F3C"
    },
    {
        "id": "049",
        "name": "araisyu",
        "cname": "洗朱",
        "color": "FB966E"
    },
    {
        "id": "050",
        "name": "momoshiocha",
        "cname": "百塩茶",
        "color": "724938"
    },
    {
        "id": "051",
        "name": "karacha",
        "cname": "唐茶",
        "color": "B47157"
    },
    {
        "id": "052",
        "name": "tokigaracha",
        "cname": "ときがら茶",
        "color": "DB8E71"
    },
    {
        "id": "053",
        "name": "ohni",
        "cname": "黄丹",
        "color": "F05E1C"
    },
    {
        "id": "054",
        "name": "sohi",
        "cname": "纁",
        "color": "ED784A"
    },
    {
        "id": "055",
        "name": "ensyucha",
        "cname": "遠州茶",
        "color": "CA7853"
    },
    {
        "id": "056",
        "name": "kabacha",
        "cname": "樺茶",
        "color": "B35C37"
    },
    {
        "id": "057",
        "name": "kogecha",
        "cname": "焦茶",
        "color": "563F2E"
    },
    {
        "id": "058",
        "name": "akakoh",
        "cname": "赤香",
        "color": "E3916E"
    },
    {
        "id": "059",
        "name": "suzumecha",
        "cname": "雀茶",
        "color": "8F5A3C"
    },
    {
        "id": "060",
        "name": "shishi",
        "cname": "宍",
        "color": "F0A986"
    },
    {
        "id": "061",
        "name": "sodenkaracha",
        "cname": "宗伝唐茶",
        "color": "A0674B"
    },
    {
        "id": "062",
        "name": "kaba",
        "cname": "樺",
        "color": "c1693c"
    },
    {
        "id": "063",
        "name": "kokikuchinashi",
        "cname": "深支子",
        "color": "FB9966"
    },
    {
        "id": "064",
        "name": "kurumi",
        "cname": "胡桃",
        "color": "947A6D"
    },
    {
        "id": "065",
        "name": "taisya",
        "cname": "代赭",
        "color": "A36336"
    },
    {
        "id": "066",
        "name": "araigaki",
        "cname": "洗柿",
        "color": "E79460"
    },
    {
        "id": "067",
        "name": "kohrozen",
        "cname": "黄櫨染",
        "color": "7D532C"
    },
    {
        "id": "068",
        "name": "akakuchiba",
        "cname": "赤朽葉",
        "color": "C78550"
    },
    {
        "id": "069",
        "name": "tonocha",
        "cname": "礪茶",
        "color": "985F2A"
    },
    {
        "id": "070",
        "name": "akashiritsurubami",
        "cname": "赤白橡",
        "color": "E1A679"
    },
    {
        "id": "071",
        "name": "sencha",
        "cname": "煎茶",
        "color": "855B32"
    },
    {
        "id": "072",
        "name": "kanzo",
        "cname": "萱草",
        "color": "FC9F4D"
    },
    {
        "id": "073",
        "name": "sharegaki",
        "cname": "洒落柿",
        "color": "FFBA84"
    },
    {
        "id": "074",
        "name": "beniukon",
        "cname": "紅鬱金",
        "color": "E98B2A"
    },
    {
        "id": "075",
        "name": "umezome",
        "cname": "梅染",
        "color": "E9A368"
    },
    {
        "id": "076",
        "name": "biwacha",
        "cname": "枇杷茶",
        "color": "B17844"
    },
    {
        "id": "077",
        "name": "chojicha",
        "cname": "丁子茶",
        "color": "96632E"
    },
    {
        "id": "078",
        "name": "kenpohzome",
        "cname": "憲法染",
        "color": "43341B"
    },
    {
        "id": "079",
        "name": "kohaku",
        "cname": "琥珀",
        "color": "CA7A2C"
    },
    {
        "id": "080",
        "name": "usugaki",
        "cname": "薄柿",
        "color": "ECB88A"
    },
    {
        "id": "081",
        "name": "kyara",
        "cname": "伽羅",
        "color": "78552B"
    },
    {
        "id": "082",
        "name": "chojizome",
        "cname": "丁子染",
        "color": "B07736"
    },
    {
        "id": "083",
        "name": "FUSHIZOME",
        "cname": "柴染",
        "color": "967249"
    },
    {
        "id": "084",
        "name": "KUCHIBA",
        "cname": "朽葉",
        "color": "E2943B"
    },
    {
        "id": "085",
        "name": "KINCHA",
        "cname": "金茶",
        "color": "C7802D"
    },
    {
        "id": "086",
        "name": "KITSUNE",
        "cname": "狐",
        "color": "9B6E23"
    },
    {
        "id": "087",
        "name": "SUSUTAKE",
        "cname": "煤竹",
        "color": "6E552F"
    },
    {
        "id": "088",
        "name": "USUKOH",
        "cname": "薄香",
        "color": "EBB471"
    },
    {
        "id": "089",
        "name": "TONOKO",
        "cname": "砥粉",
        "color": "D7B98E"
    },
    {
        "id": "090",
        "name": "GINSUSUTAKE",
        "cname": "銀煤竹",
        "color": "82663A"
    },
    {
        "id": "091",
        "name": "OHDO",
        "cname": "黄土",
        "color": "B68E55"
    },
    {
        "id": "092",
        "name": "SHIRACHA",
        "cname": "白茶",
        "color": "BC9F77"
    },
    {
        "id": "093",
        "name": "KOBICHA",
        "cname": "媚茶",
        "color": "876633"
    },
    {
        "id": "094",
        "name": "KIGARACHA",
        "cname": "黄唐茶",
        "color": "C18A26"
    },
    {
        "id": "095",
        "name": "YAMABUKI",
        "cname": "山吹",
        "color": "FFB11B"
    },
    {
        "id": "096",
        "name": "YAMABUKICHA",
        "cname": "山吹茶",
        "color": "D19826"
    },
    {
        "id": "097",
        "name": "HAJIZOME",
        "cname": "櫨染",
        "color": "DDA52D"
    },
    {
        "id": "098",
        "name": "KUWACHA",
        "cname": "桑茶",
        "color": "C99833"
    },
    {
        "id": "099",
        "name": "TAMAGO",
        "cname": "玉子",
        "color": "F9BF45"
    },
    {
        "id": "100",
        "name": "SHIROTSURUBAMI",
        "cname": "白橡",
        "color": "DCB879"
    },
    {
        "id": "101",
        "name": "KITSURUBAMI",
        "cname": "黄橡",
        "color": "BA9132"
    },
    {
        "id": "102",
        "name": "TAMAMOROKOSHI",
        "cname": "玉蜀黍",
        "color": "E8B647"
    },
    {
        "id": "103",
        "name": "HANABA",
        "cname": "花葉",
        "color": "F7C242"
    },
    {
        "id": "104",
        "name": "NAMAKABE",
        "cname": "生壁",
        "color": "7D6C46"
    },
    {
        "id": "105",
        "name": "TORINOKO",
        "cname": "鳥の子",
        "color": "DAC9A6"
    },
    {
        "id": "106",
        "name": "USUKI",
        "cname": "浅黄",
        "color": "FAD689"
    },
    {
        "id": "107",
        "name": "KIKUCHIBA",
        "cname": "黄朽葉",
        "color": "D9AB42"
    },
    {
        "id": "108",
        "name": "KUCHINASHI",
        "cname": "梔子",
        "color": "F6C555"
    },
    {
        "id": "109",
        "name": "TOHOH",
        "cname": "籐黄",
        "color": "FFC408"
    },
    {
        "id": "110",
        "name": "UKON",
        "cname": "鬱金",
        "color": "EFBB24"
    },
    {
        "id": "111",
        "name": "KARASHI",
        "cname": "芥子",
        "color": "CAAD5F"
    },
    {
        "id": "112",
        "name": "HIGOSUSUTAKE",
        "cname": "肥後煤竹",
        "color": "8D742A"
    },
    {
        "id": "113",
        "name": "RIKYUSHIRACHA",
        "cname": "利休白茶",
        "color": "B4A582"
    },
    {
        "id": "114",
        "name": "AKU",
        "cname": "灰汁",
        "color": "877F6C"
    },
    {
        "id": "115",
        "name": "RIKYUCHA",
        "cname": "利休茶",
        "color": "897D55"
    },
    {
        "id": "116",
        "name": "ROKOHCHA",
        "cname": "路考茶",
        "color": "74673E"
    },
    {
        "id": "117",
        "name": "NATANEYU",
        "cname": "菜種油",
        "color": "A28C37"
    },
    {
        "id": "118",
        "name": "UGUISUCHA",
        "cname": "鶯茶",
        "color": "6C6024"
    },
    {
        "id": "119",
        "name": "KIMIRUCHA",
        "cname": "黄海松茶",
        "color": "867835"
    },
    {
        "id": "120",
        "name": "MIRUCHA",
        "cname": "海松茶",
        "color": "62592C"
    },
    {
        "id": "121",
        "name": "KARIYASU",
        "cname": "刈安",
        "color": "E9CD4C"
    },
    {
        "id": "122",
        "name": "NANOHANA",
        "cname": "菜の花",
        "color": "F7D94C"
    },
    {
        "id": "123",
        "name": "KIHADA",
        "cname": "黄蘗",
        "color": "FBE251"
    },
    {
        "id": "124",
        "name": "MUSHIKURI",
        "cname": "蒸栗",
        "color": "D9CD90"
    },
    {
        "id": "125",
        "name": "AOKUCHIBA",
        "cname": "青朽葉",
        "color": "ADA142"
    },
    {
        "id": "126",
        "name": "OMINAESHI",
        "cname": "女郎花",
        "color": "DDD23B"
    },
    {
        "id": "127",
        "name": "HIWACHA",
        "cname": "鶸茶",
        "color": "A5A051"
    },
    {
        "id": "128",
        "name": "HIWA",
        "cname": "鶸",
        "color": "BEC23F"
    },
    {
        "id": "129",
        "name": "UGUISU",
        "cname": "鶯",
        "color": "6C6A2D"
    },
    {
        "id": "130",
        "name": "YANAGICHA",
        "cname": "柳茶",
        "color": "939650"
    },
    {
        "id": "131",
        "name": "KOKE",
        "cname": "苔",
        "color": "838A2D"
    },
    {
        "id": "132",
        "name": "KIKUJIN",
        "cname": "麹塵",
        "color": "B1B479"
    },
    {
        "id": "133",
        "name": "RIKANCHA",
        "cname": "璃寛茶",
        "color": "616138"
    },
    {
        "id": "134",
        "name": "AIKOBICHA",
        "cname": "藍媚茶",
        "color": "4B4E2A"
    },
    {
        "id": "135",
        "name": "MIRU",
        "cname": "海松",
        "color": "5B622E"
    },
    {
        "id": "136",
        "name": "SENSAICHA",
        "cname": "千歳茶",
        "color": "4D5139"
    },
    {
        "id": "137",
        "name": "BAIKOCHA",
        "cname": "梅幸茶",
        "color": "89916B"
    },
    {
        "id": "138",
        "name": "HIWAMOEGI",
        "cname": "鶸萌黄",
        "color": "90B44B"
    },
    {
        "id": "139",
        "name": "YANAGIZOME",
        "cname": "柳染",
        "color": "91AD70"
    },
    {
        "id": "140",
        "name": "URAYANAGI",
        "cname": "裏柳",
        "color": "B5CAA0"
    },
    {
        "id": "141",
        "name": "IWAICHA",
        "cname": "岩井茶",
        "color": "646A58"
    },
    {
        "id": "142",
        "name": "MOEGI",
        "cname": "萌黄",
        "color": "7BA23F"
    },
    {
        "id": "143",
        "name": "NAE",
        "cname": "苗",
        "color": "86C166"
    },
    {
        "id": "144",
        "name": "YANAGISUSUTAKE",
        "cname": "柳煤竹",
        "color": "4A593D"
    },
    {
        "id": "145",
        "name": "MATSUBA",
        "cname": "松葉",
        "color": "42602D"
    },
    {
        "id": "146",
        "name": "AONI",
        "cname": "青丹",
        "color": "516E41"
    },
    {
        "id": "147",
        "name": "USUAO",
        "cname": "薄青",
        "color": "91B493"
    },
    {
        "id": "148",
        "name": "YANAGINEZUMI",
        "cname": "柳鼠",
        "color": "808F7C"
    },
    {
        "id": "149",
        "name": "TOKIWA",
        "cname": "常磐",
        "color": "1B813E"
    },
    {
        "id": "150",
        "name": "WAKATAKE",
        "cname": "若竹",
        "color": "5DAC81"
    },
    {
        "id": "151",
        "name": "CHITOSEMIDORI",
        "cname": "千歳緑",
        "color": "36563C"
    },
    {
        "id": "152",
        "name": "MIDORI",
        "cname": "緑",
        "color": "227D51"
    },
    {
        "id": "153",
        "name": "BYAKUROKU",
        "cname": "白緑",
        "color": "A8D8B9"
    },
    {
        "id": "154",
        "name": "OITAKE",
        "cname": "老竹",
        "color": "6A8372"
    },
    {
        "id": "155",
        "name": "TOKUSA",
        "cname": "木賊",
        "color": "2D6D4B"
    },
    {
        "id": "156",
        "name": "ONANDOCHA",
        "cname": "御納戸茶",
        "color": "465D4C"
    },
    {
        "id": "157",
        "name": "ROKUSYOH",
        "cname": "緑青",
        "color": "24936E"
    },
    {
        "id": "158",
        "name": "SABISEIJI",
        "cname": "錆青磁",
        "color": "86A697"
    },
    {
        "id": "159",
        "name": "AOTAKE",
        "cname": "青竹",
        "color": "00896C"
    },
    {
        "id": "160",
        "name": "VELUDO",
        "cname": "ビロード",
        "color": "096148"
    },
    {
        "id": "161",
        "name": "MUSHIAO",
        "cname": "虫襖",
        "color": "20604F"
    },
    {
        "id": "162",
        "name": "AIMIRUCHA",
        "cname": "藍海松茶",
        "color": "0F4C3A"
    },
    {
        "id": "163",
        "name": "TONOCHA2",
        "cname": "沈香茶",
        "color": "4F726C"
    },
    {
        "id": "164",
        "name": "AOMIDORI",
        "cname": "青緑",
        "color": "00AA90"
    },
    {
        "id": "165",
        "name": "SEIJI",
        "cname": "青磁",
        "color": "69B0AC"
    },
    {
        "id": "166",
        "name": "TETSU",
        "cname": "鉄",
        "color": "26453D"
    },
    {
        "id": "167",
        "name": "MIZUASAGI",
        "cname": "水浅葱",
        "color": "66BAB7"
    },
    {
        "id": "168",
        "name": "SEIHEKI",
        "cname": "青碧",
        "color": "268785"
    },
    {
        "id": "169",
        "name": "SABITETSUONANDO",
        "cname": "錆鉄御納戸",
        "color": "405B55"
    },
    {
        "id": "170",
        "name": "KORAINANDO",
        "cname": "高麗納戸",
        "color": "305A56"
    },
    {
        "id": "171",
        "name": "BYAKUGUN",
        "cname": "白群",
        "color": "78C2C4"
    },
    {
        "id": "172",
        "name": "OMESHICHA",
        "cname": "御召茶",
        "color": "376B6D"
    },
    {
        "id": "173",
        "name": "KAMENOZOKI",
        "cname": "瓶覗",
        "color": "A5DEE4"
    },
    {
        "id": "174",
        "name": "FUKAGAWANEZUMI",
        "cname": "深川鼠",
        "color": "77969A"
    },
    {
        "id": "175",
        "name": "SABIASAGI",
        "cname": "錆浅葱",
        "color": "6699A1"
    },
    {
        "id": "176",
        "name": "MIZU",
        "cname": "水",
        "color": "81C7D4"
    },
    {
        "id": "177",
        "name": "ASAGI",
        "cname": "浅葱",
        "color": "33A6B8"
    },
    {
        "id": "178",
        "name": "ONANDO",
        "cname": "御納戸",
        "color": "0C4842"
    },
    {
        "id": "179",
        "name": "AI",
        "cname": "藍",
        "color": "0D5661"
    },
    {
        "id": "180",
        "name": "SHINBASHI",
        "cname": "新橋",
        "color": "0089A7"
    },
    {
        "id": "181",
        "name": "SABIONANDO",
        "cname": "錆御納戸",
        "color": "336774"
    },
    {
        "id": "182",
        "name": "TETSUONANDO",
        "cname": "鉄御納戸",
        "color": "255359"
    },
    {
        "id": "183",
        "name": "HANAASAGI",
        "cname": "花浅葱",
        "color": "1E88A8"
    },
    {
        "id": "184",
        "name": "AINEZUMI",
        "cname": "藍鼠",
        "color": "566C73"
    },
    {
        "id": "185",
        "name": "MASUHANA",
        "cname": "舛花",
        "color": "577C8A"
    },
    {
        "id": "186",
        "name": "SORA",
        "cname": "空",
        "color": "58B2DC"
    },
    {
        "id": "187",
        "name": "NOSHIMEHANA",
        "cname": "熨斗目花",
        "color": "2B5F75"
    },
    {
        "id": "188",
        "name": "CHIGUSA",
        "cname": "千草",
        "color": "3A8FB7"
    },
    {
        "id": "189",
        "name": "OMESHIONANDO",
        "cname": "御召御納戸",
        "color": "2E5C6E"
    },
    {
        "id": "190",
        "name": "HANADA",
        "cname": "縹",
        "color": "006284"
    },
    {
        "id": "191",
        "name": "WASURENAGUSA",
        "cname": "勿忘草",
        "color": "7DB9DE"
    },
    {
        "id": "192",
        "name": "GUNJYO",
        "cname": "群青",
        "color": "51A8DD"
    },
    {
        "id": "193",
        "name": "TSUYUKUSA",
        "cname": "露草",
        "color": "2EA9DF"
    },
    {
        "id": "194",
        "name": "KUROTSURUBAMI",
        "cname": "黒橡",
        "color": "0B1013"
    },
    {
        "id": "195",
        "name": "KON",
        "cname": "紺",
        "color": "0F2540"
    },
    {
        "id": "196",
        "name": "KACHI",
        "cname": "褐",
        "color": "08192D"
    },
    {
        "id": "197",
        "name": "RURI",
        "cname": "瑠璃",
        "color": "005CAF"
    },
    {
        "id": "198",
        "name": "RURIKON",
        "cname": "瑠璃紺",
        "color": "0B346E"
    },
    {
        "id": "199",
        "name": "BENIMIDORI",
        "cname": "紅碧",
        "color": "7B90D2"
    },
    {
        "id": "200",
        "name": "FUJINEZUMI",
        "cname": "藤鼠",
        "color": "6E75A4"
    },
    {
        "id": "201",
        "name": "TETSUKON",
        "cname": "鉄紺",
        "color": "261E47"
    },
    {
        "id": "202",
        "name": "KONJYO",
        "cname": "紺青",
        "color": "113285"
    },
    {
        "id": "203",
        "name": "BENIKAKEHANA",
        "cname": "紅掛花",
        "color": "4E4F97"
    },
    {
        "id": "204",
        "name": "KONKIKYO",
        "cname": "紺桔梗",
        "color": "211E55"
    },
    {
        "id": "205",
        "name": "FUJI",
        "cname": "藤",
        "color": "8B81C3"
    },
    {
        "id": "206",
        "name": "FUTAAI",
        "cname": "二藍",
        "color": "70649A"
    },
    {
        "id": "207",
        "name": "OUCHI",
        "cname": "楝",
        "color": "9B90C2"
    },
    {
        "id": "208",
        "name": "FUJIMURASAKI",
        "cname": "藤紫",
        "color": "8A6BBE"
    },
    {
        "id": "209",
        "name": "KIKYO",
        "cname": "桔梗",
        "color": "6A4C9C"
    },
    {
        "id": "210",
        "name": "SHION",
        "cname": "紫苑",
        "color": "8F77B5"
    },
    {
        "id": "211",
        "name": "MESSHI",
        "cname": "滅紫",
        "color": "533D5B"
    },
    {
        "id": "212",
        "name": "USU",
        "cname": "薄",
        "color": "B28FCE"
    },
    {
        "id": "213",
        "name": "HASHITA",
        "cname": "半",
        "color": "986DB2"
    },
    {
        "id": "214",
        "name": "EDOMURASAKI",
        "cname": "江戸紫",
        "color": "77428D"
    },
    {
        "id": "215",
        "name": "SHIKON",
        "cname": "紫紺",
        "color": "3C2F41"
    },
    {
        "id": "216",
        "name": "KOKIMURASAKI",
        "cname": "深紫",
        "color": "4A225D"
    },
    {
        "id": "217",
        "name": "SUMIRE",
        "cname": "菫",
        "color": "66327C"
    },
    {
        "id": "218",
        "name": "MURASAKI",
        "cname": "紫",
        "color": "592C63"
    },
    {
        "id": "219",
        "name": "AYAME",
        "cname": "菖蒲",
        "color": "6F3381"
    },
    {
        "id": "220",
        "name": "FUJISUSUTAKE",
        "cname": "藤煤竹",
        "color": "574C57"
    },
    {
        "id": "221",
        "name": "BENIFUJI",
        "cname": "紅藤",
        "color": "B481BB"
    },
    {
        "id": "222",
        "name": "KUROBENI",
        "cname": "黒紅",
        "color": "3F2B36"
    },
    {
        "id": "223",
        "name": "NASUKON",
        "cname": "茄子紺",
        "color": "572A3F"
    },
    {
        "id": "224",
        "name": "BUDOHNEZUMI",
        "cname": "葡萄鼠",
        "color": "5E3D50"
    },
    {
        "id": "225",
        "name": "HATOBANEZUMI",
        "cname": "鳩羽鼠",
        "color": "72636E"
    },
    {
        "id": "226",
        "name": "KAKITSUBATA",
        "cname": "杜若",
        "color": "622954"
    },
    {
        "id": "227",
        "name": "EBIZOME",
        "cname": "蒲葡",
        "color": "6D2E5B"
    },
    {
        "id": "228",
        "name": "BOTAN",
        "cname": "牡丹",
        "color": "C1328E"
    },
    {
        "id": "229",
        "name": "UMEMURASAKI",
        "cname": "梅紫",
        "color": "A8497A"
    },
    {
        "id": "230",
        "name": "NISEMURASAKI",
        "cname": "似紫",
        "color": "562E37"
    },
    {
        "id": "231",
        "name": "TSUTSUJI",
        "cname": "躑躅",
        "color": "E03C8A"
    },
    {
        "id": "232",
        "name": "MURASAKITOBI",
        "cname": "紫鳶",
        "color": "60373E"
    },
    {
        "id": "233",
        "name": "SHIRONERI",
        "cname": "白練",
        "color": "FCFAF2"
    },
    {
        "id": "234",
        "name": "GOFUN",
        "cname": "胡粉",
        "color": "FFFFFB"
    },
    {
        "id": "235",
        "name": "SHIRONEZUMI",
        "cname": "白鼠",
        "color": "BDC0BA"
    },
    {
        "id": "236",
        "name": "GINNEZUMI",
        "cname": "銀鼠",
        "color": "91989F"
    },
    {
        "id": "237",
        "name": "NAMARI",
        "cname": "鉛",
        "color": "787878"
    },
    {
        "id": "238",
        "name": "HAI",
        "cname": "灰",
        "color": "828282"
    },
    {
        "id": "239",
        "name": "SUNEZUMI",
        "cname": "素鼠",
        "color": "787D7B"
    },
    {
        "id": "240",
        "name": "RIKYUNEZUMI",
        "cname": "利休鼠",
        "color": "707C74"
    },
    {
        "id": "241",
        "name": "NIBI",
        "cname": "鈍",
        "color": "656765"
    },
    {
        "id": "242",
        "name": "AONIBI",
        "cname": "青鈍",
        "color": "535953"
    },
    {
        "id": "243",
        "name": "DOBUNEZUMI",
        "cname": "溝鼠",
        "color": "4F4F48"
    },
    {
        "id": "244",
        "name": "BENIKESHINEZUMI",
        "cname": "紅消鼠",
        "color": "52433D"
    },
    {
        "id": "245",
        "name": "AISUMICHA",
        "cname": "藍墨茶",
        "color": "373C38"
    },
    {
        "id": "246",
        "name": "BINROJIZOME",
        "cname": "檳榔子染",
        "color": "3A3226"
    },
    {
        "id": "247",
        "name": "KESHIZUMI",
        "cname": "消炭",
        "color": "434343"
    },
    {
        "id": "248",
        "name": "SUMI",
        "cname": "墨",
        "color": "1C1C1C"
    },
    {
        "id": "249",
        "name": "KURO",
        "cname": "黒",
        "color": "080808"
    },
    {
        "id": "250",
        "name": "RO",
        "cname": "呂",
        "color": "0C0C0C"
    }
  ]
  color = colors[parseInt((Math.random(1)*250), 10)]
  if(dark){
    while(parseInt(color.color.substring(0,2), 16) + parseInt(color.color.substring(2,4), 16) + parseInt(color.color.substring(4,6), 16) > 200){
      color = colors[parseInt((Math.random(1)*250), 10)]
//       console.log("yes")
    }
  }
  return color
}
