
// download.js
module.exports = {
  run: [
    {
      method: "input.form",
      params: {
        title: "Hugging Face Access Token",
        items: [{
          key: "token",
          type: "text",
          placeholder: "Enter your HF token (hf_XXX...)",
          description: "Required for checkpoints; request access on Hugging Face (facebook/sam-3d-objects) first."
        }]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        message: "huggingface-cli login --token {{input.token}}"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install 'huggingface-hub[cli]<1.0'",
          "huggingface-cli download --repo-type model --local-dir checkpoints/hf-download --max-workers 1 facebook/sam-3d-objects",
          "{{platform === 'win32' ? 'move checkpoints\\\\hf-download\\\\checkpoints checkpoints\\\\hf' : 'mv checkpoints/hf-download/checkpoints checkpoints/hf'}}",
          "{{platform === 'win32' ? 'rmdir /s /q checkpoints\\\\hf-download' : 'rm -rf checkpoints/hf-download'}}"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/facebookresearch/segment-anything-2 sam2",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app/checkpoints/sam2",
        message: "huggingface-cli download facebook/sam2-hiera-large --local-dir=checkpoints"
      }
    }
  ]
}
