// torch.js
module.exports = {
    run: [
        // windows nvidia
        {
            "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
            "method": "shell.run",
            "params": {
                "venv": "{{args && args.venv ? args.venv : null}}",
                "path": "{{args && args.path ? args.path : '.'}}",
                "message": [
                    "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 {{args && args.xformers ? 'xformers==0.0.28.post3' : ''}} --index-url https://download.pytorch.org/whl/cu121 --force-reinstall --no-deps",
                    "{{args && args.triton ? 'uv pip install triton-windows' : ''}}"
                ]
            },
            "next": null
        },
        // windows amd
        {
            "when": "{{platform === 'win32' && gpu === 'amd'}}",
            "method": "shell.run",
            "params": {
                "venv": "{{args && args.venv ? args.venv : null}}",
                "path": "{{args && args.path ? args.path : '.'}}",
                "message": "uv pip install torch-directml torchaudio torchvision numpy==1.26.4 --force-reinstall"
            },
            "next": null
        },
        // windows cpu
        {
            "when": "{{platform === 'win32' && (gpu !== 'nvidia' && gpu !== 'amd')}}",
            "method": "shell.run",
            "params": {
                "venv": "{{args && args.venv ? args.venv : null}}",
                "path": "{{args && args.path ? args.path : '.'}}",
                "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 numpy==1.26.4 --force-reinstall --no-deps"
            },
            "next": null
        },
        // apple mac
        {
            "when": "{{platform === 'darwin'}}",
            "method": "shell.run",
            "params": {
                "venv": "{{args && args.venv ? args.venv : null}}",
                "path": "{{args && args.path ? args.path : '.'}}",
                "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps"
            },
            "next": null
        },
        // linux nvidia
        {
            "when": "{{platform === 'linux' && gpu === 'nvidia'}}",
            "method": "shell.run",
            "params": {
                "venv": "{{args && args.venv ? args.venv : null}}",
                "path": "{{args && args.path ? args.path : '.'}}",
                "message": [
                    "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 {{args && args.xformers ? 'xformers==0.0.28.post3' : ''}} --index-url https://download.pytorch.org/whl/cu121 --force-reinstall --no-deps",
                    "{{args && args.triton ? 'uv pip install triton' : ''}}"
                ]
            },
            "next": null
        },
        // linux rocm (amd)
        {
            "when": "{{platform === 'linux' && gpu === 'amd'}}",
            "method": "shell.run",
            "params": {
                "venv": "{{args && args.venv ? args.venv : null}}",
                "path": "{{args && args.path ? args.path : '.'}}",
                "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/rocm6.0 --force-reinstall --no-deps"
            },
            "next": null
        },
        // linux cpu
        {
            "when": "{{platform === 'linux' && (gpu !== 'amd' && gpu !=='nvidia')}}",
            "method": "shell.run",
            "params": {
                "venv": "{{args && args.venv ? args.venv : null}}",
                "path": "{{args && args.path ? args.path : '.'}}",
                "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps"
            },
            "next": null
        }
    ]
}