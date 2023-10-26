export const parseUrl = (text: string) => {
  const urlRegex = /(https?:\/\/\S+)/g
  return text?.replace(urlRegex, function (url) {
    return '<a class="font-bold" target="_blank" href="' + url + '">' + url + '</a>'
  })
}
