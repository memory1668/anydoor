<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <style>
    a{
      font-size: 18px;
    }
  </style>
</head>
<body>
{{#each files}}
  <img src="{{icon}}" alt="" width="15px" height="15px">
  <a href="{{../dir}}/{{file}}">{{file}}</a></br>
{{/each}}
</body>
</html>
