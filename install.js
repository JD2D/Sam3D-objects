
// install.js
module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/facebookresearch/sam-3d-objects app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: "conda create -p env python=3.10 -y"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "uv pip install --upgrade pip"
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          xformers: true,
          triton: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        build: true,
        env: { 
          "PIP_EXTRA_INDEX_URL": "https://pypi.ngc.nvidia.com https://download.pytorch.org/whl/cu121",
          "PIP_FIND_LINKS": "https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.5.1_cu121.html"
        },
        message: [
          "uv pip install -e .",
          "uv pip install -r requirements.dev.txt",
          "uv pip install -r requirements.inference.txt",
          "uv pip install -r requirements.p3d.txt"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "download.js"
      }
    }
  ]
}
