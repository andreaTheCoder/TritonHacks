from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import uvicorn

app = FastAPI()

static_files = StaticFiles(directory='public')
views = Jinja2Templates(directory="public/views")

app.mount('/public', static_files, name='public')
app.mount("/css", StaticFiles(directory="public/css"), name="css")
app.mount("/js", StaticFiles(directory="public/js"), name="js")

class Image(BaseModel):
    title: str 
    description: str 
    src: str 

images = {}
@app.get('/', response_class=HTMLResponse)
def get_home(request: Request) -> HTMLResponse:
    return views.TemplateResponse("main.html", {"request": request, "images": images})
    

@app.post("/images", response_class=JSONResponse)
def post_image(img_data: Image):
    # add data
    img_id = len(images) + 1
    images.update({img_id: img_data})
    print(img_data)
    return {"img_id": img_id, **img_data.dict()}

@app.put("/images/{img_id}", response_class=JSONResponse)
def modify_image(img_id: int, img_data: Image):
    #modify data
    print(img_data)
    if img_id in images:
        images.update({img_id: img_data})
        return images[img_id]
    raise HTTPException(status_code=404, detail="Image not found")

@app.delete('/images/{img_id}', response_class=JSONResponse)
def delete_img(img_id: int):
    if img_id in images:
        return images.pop(img_id)
    raise HTTPException(status_code=404, detail="Image not found")
    
if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8007, reload=True)
